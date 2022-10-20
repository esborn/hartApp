import DateUtils from "../helpers/DateUtils";
import StringHelpers from "../helpers/StringHelpers";
import filters from "../enums/filters.json";
import angular from "angular";

export default class QueryBuilder {
    constructor() {
        this.query = "";

        this.isTransactional = false;
        this.isTransactionValid = false;
        this.currentOperator = "";
        this.currentField = "";
        this.states = [];
    }

    build() {
        if (this.states.length > 0) return;

        const query = this.query

        this.query = "";

        return query;
    }

    transactional() {
        this.states.push(angular.copy(this));

        this.query = "";
        this.isTransactional = true;
        this.isTransactionValid = true;
        this.currentOperator = "";
        this.currentField = "";

        return this;
    }

    commit() {
        let state = this.states.pop();

        this.query = this.isTransactionValid ?
                            state.query + this.query :
                            state.query;

        this.isTransactional = state.isTransactional;
        this.isTransactionValid = state.isTransactionValid;
        this.currentOperator = state.currentOperator;
        this.currentField = state.currentField;

        return this;
    }

    queryValue( str ) {
        this.currentQuery = `${str}`;
        return this;
    }

    comma() {
        this.currentQuery = ",";
        return this;
    }

    openBracket() {
        this.currentQuery = "(";
        return this;
    }

    closeBracket() {
        if (StringHelpers.endsWith(this.currentQuery, "(")) {
            this.isTransactionValid = false;
        }

        this.currentQuery = ")";
        return this;
    }

    and() {
        if (!StringHelpers.endsWith(this.currentQuery, "(") &&
            !StringHelpers.endsWith(this.lastQueryProcessed, "(")) {
            return this.logicalOperator(filters.and);
        }

        return this;
    }

    or() {
        if (!StringHelpers.endsWith(this.currentQuery, "(") &&
            !StringHelpers.endsWith(this.lastQueryProcessed, "(")) {
            return this.logicalOperator(filters.or);
        }

        return this;
    }

    gt() {
        return this.operator(filters.gt);
    }

    lt() {
        return this.operator(filters.lt);
    }

    eq() {
        return this.operator(filters.eq);
    }

    ge() {
        return this.operator(filters.ge);
    }

    le() {
        return this.operator(filters.le);
    }

    logicalOperator(val){
        if (StringHelpers.isNullOrEmpty(val) ||
            !filters.logicalOperators.includes(val)) {
            this.isTransactionValid = false;
        }

        this.currentQuery = ` ${val} `;
        return this;
    }

    operator( val ) {
        if (StringHelpers.isNullOrEmpty(val)) {
            this.isTransactionValid = false;
        }

        this.currentOperator = val;
        this.currentQuery = ` ${val} `;
        return this;
    }

    field( name ) {
        if (StringHelpers.isNullOrEmpty(name)) {
            this.isTransactionValid = false;
        }

        this.currentField = name;
        this.currentQuery = `${name}`;
        return this;
    }

    value( val ) {
        if (StringHelpers.isNullOrEmpty(val)) {
            this.isTransactionValid = false;
        }

        this.currentQuery = `'${val}'`;
        return this;
    }

    contains( str, field ) {
        if (StringHelpers.isNullOrEmpty(str)) {
            this.isTransactionValid = false;
        }

        this.currentQuery = `substringof('${str}', ${field})`;
        return this;
    }

    datetime( date, operator ) {
        if (!date) {
            this.isTransactionValid = false;
        }

        if (!operator) {
            this.currentQuery = `datetime'${DateUtils.getQueryFormat(date)}'`;
        } else {
            if (operator === filters.eq) {
                this.ge()
                    .dateTimeBasedOnOperator(date)
                    .logicalOperator(filters.and)
                    .field(this.currentField)
                    .le()
                    .dateTimeBasedOnOperator(date)
            }
            else {
                this.operator(operator)
                    .dateTimeBasedOnOperator(date)
            }
        }
        return this;
    }

    dateTimeBasedOnOperator( date ) {
        if (this.currentOperator === filters.ge || this.currentOperator === filters.lt) {
            this.currentQuery = `datetime'${DateUtils.getStartDayQueryFormat(date)}'`;
        }

        if (this.currentOperator === filters.le || this.currentOperator === filters.gt) {
            this.currentQuery = `datetime'${DateUtils.getEndDayQueryFormat(date)}'`;
        }

        if (this.currentOperator === "") {
            this.currentQuery = `datetime'${DateUtils.getQueryFormat(date)}'`
        }

        return this;
    }

    selectAll() {
        if (StringHelpers.endsWith(this.currentQuery, "/items")) {
            this.currentQuery = "?$select=*";
        }
        else {
            this.currentQuery = "&$select=*";
        }

        return this;
    }

    filter() {
        this.currentQuery = "?$filter=";
        return this;
    }

    defaultTop() {
        if (StringHelpers.endsWith(this.currentQuery, "/items")) {
            this.currentQuery = "?$top=500&$orderby=Created desc";
        }
        else {
            this.currentQuery = "&$top=500&$orderby=Created desc";
        }

        return this;
    }

    get lastQueryProcessed() {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1].query;
        }

        return this.query;
    }

    get currentQuery() {
        return this.query;
    }

    set currentQuery( value ) {
        this.query += value;
    }
}