import permissions from "../components/common/authorization/hasPermissions";

import angular from "angular";

export default class Bootstrap {
    static register() {
        const app = angular.module("omt");

        app.directive("hasPermissions", permissions);
    }
}