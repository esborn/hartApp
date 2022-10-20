import envConfig from "../../../../config/envConfig.js";
import BaseController from "../../../common/BaseController";

export default class UsersController extends BaseController{
    constructor($window, $injector) {
        super($injector);

        super.router = this.$router;

        this.$window = $window;
    }

    $routerOnActivate(next, current) {
        super.permissions = [super.appPermissions.admin];

        let init = () => {
            if (super.$routerOnActivate(next, current)) {
                this.activate();
            }

        };

        return super.initializePage(init);
    }

    activate() {
        this.$window.open(envConfig.site_url + "/_layouts/15/groups.aspx", "_blank");
    }
}

UsersController.$inject = ["$window", "$injector"];