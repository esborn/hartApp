import sideNavService from "../common/services/sideNav/SideNavService";
import modalService from "../common/services/materialElements/ModalDialogService";
import toastService from "../common/services/materialElements/ToastService";
import cacheService from "../common/services/Cache";
import navigationService from "../common/services/NavigationService";
import userService from "../common/services/user/UserService";
import countryDataAccessService from "../common/services/dataAccess/country/CountryDataAccessService";
import regionDataAccessService from "../common/services/dataAccess/region/RegionDataAccessService";
import commonDataService from "../common/services/CommonDataService";
import responseService from "../common/services/response/ResponseService";
import responseCodeDataAccessService from "../common/services/dataAccess/responseCode/ResponseCodeDataAccessService";
import reportsService from "../common/services/reports/ReportsService";
import reportsDataAccessService from "../common/services/dataAccess/reports/reportsDataAccessService";
import appHttpInterceptor from "../common/interceptors/AppHttpInterceptor";
import attachmentsDataAccessService from "../common/services/dataAccess/attachments/AttachmentsDataAccessService";
import reportsAttachmentsService from "../common/services/attachments/ReportsAttachmentsService";

import angular from "angular";

export default class Bootstrap {
    static register() {
        const app = angular.module("omt");

        app.service("sideNavService", sideNavService);
        app.service("modalService", modalService);
        app.service("toastService", toastService);
        app.service("cache", cacheService);
        app.service("navigationService", navigationService);
        app.service("userService", userService);
        app.service("countryDataAccessService", countryDataAccessService);
        app.service("regionDataAccessService", regionDataAccessService);
        app.service("commonDataService", commonDataService);
        app.service("responseService", responseService);
        app.service("responseCodeDataAccessService", responseCodeDataAccessService);
        app.service("reportsService", reportsService);  
        app.service("reportsDataAccessService", reportsDataAccessService);
        app.service("appHttpInterceptor", appHttpInterceptor);
        app.service("attachmentsDataAccessService", attachmentsDataAccessService);
        app.service("reportsAttachmentsService", reportsAttachmentsService);
    }
}