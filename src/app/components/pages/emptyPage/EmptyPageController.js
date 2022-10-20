import BaseController from "../../common/BaseController";

export default class EmptyPageController extends BaseController {
    constructor($injector) {
        super($injector);

        super.router = this.$router.parent ? this.$router.parent : this.$router;
    }

    $routerOnActivate(next, current) {
        super.permissions = [
            super.appPermissions.omtMember,
            super.appPermissions.approver,
            super.appPermissions.contributor,
            super.appPermissions.reviewer,
            super.appPermissions.admin
        ];

        let init = () => {
            super.$routerOnActivate(next, current);
        };

        return super.initializePage(init);
    }
}

EmptyPageController.$inject = ["$injector"]