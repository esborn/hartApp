import angular from "angular";
import ObjectMapper from "../common/helpers/ObjectMapper";
import Permissions from "../common/enums/permissions.json";

export default class AngularApp {
    static bootstrap() {
        const $injector = angular.injector(['ng', 'omt']);

        const userService = $injector.get("userService");

        const appStart = () => {
            angular.element(document).ready(() => {
                angular.bootstrap(document, ["omt"])
            })
        };

        userService.getCurrentUser().then((data) => {
                let userModel = ObjectMapper.toUserModel(data);

                userModel.permissions = userModel.groups.concat(Permissions.everyone);

                angular.module("omt").constant("user", userModel);
                appStart();                
            },
            () => {
                throw "User error";
            });
    }
}