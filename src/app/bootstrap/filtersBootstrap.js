import dateFormat from "../common/filters/dateFormat";

import angular from "angular";

export default class Bootstrap {
    static register() {
        const app = angular.module("omt");

        app.filter("dateFormat", dateFormat);
    }
}