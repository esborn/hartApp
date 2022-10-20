import DateUtils from "../helpers/DateUtils";
import BaseModel from "./BaseModel";

export default class ResponseModel extends BaseModel {
    constructor() {
        super();
        this.code = "";
        this.responseDescription = "";
        this.startDate = DateUtils.today;
        this.soDEndDate = DateUtils.today;
        this.region = "";
        this.emailAddress = "";
        this.country = "";
        this.responseStatus = "";
        this.responseCategory = null;
        this.soDCategory = null;      
        this.phase = null;
        this.strategyNumber = null;
        this.strategyDate = DateUtils.today;
    }
}

//channged