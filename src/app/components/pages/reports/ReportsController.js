import BaseController from "../../common/BaseController";
import GridOptions from "../../../common/enums/gridOptions";


export default class ReportsController extends BaseController {
    constructor($window, $injector, reportsService, responseService) {
        super($injector);

        super.router = this.$router;
        this.responseService = responseService;
        this.reportsService = reportsService;        
        
        this.$window = $window;
        this.setReportsGridOptions();
        //this.initFilters();        
    }

    $routerOnActivate(next, current) {
        super.permissions = [super.appPermissions.everyone];
        
        let init = () => {
            super.$routerOnActivate(next, current);

            return this.activate(next.params.id);
        };

        return super.initializePage(init);
    }

    activate(responseId) {        
        return super.initializePageData(this.loadAllReports(responseId));
    }

    loadAllReports(responseId) {
        super.isRequestProcessing = true;
        this.canAddReport = this.hasPermissions([super.appPermissions.admin, super.appPermissions.contributor]);

        this.responseService.getResponse(responseId)
        .then(
            (data) => {
                var responseModel = this.responseService.buildModel(data);
                // var region = JSON.parse(responseModel.region);
                // console.log(region);

                this.reportOptions.responseId = responseId;
                this.reportOptions.code = responseModel.code;
                this.reportOptions.description = responseModel.description;
                this.reportOptions.region = JSON.parse(responseModel.region).region;
                this.reportOptions.responseStatus = responseModel.responseStatus;
                this.reportOptions.country = responseModel.country;     

                return this.reportsService.getAllReports(responseId)
                .then(
                    (data) => {
                        this.reportOptions.data = data;                
                        super.isRequestProcessing = false;
                        //console.log(responseModel, "responseModel on reports 1");
                        
                        return this.reportOptions.data;                        
                    },
                    () => {
                        super.isRequestProcessing = false;
                        this.reportOptions.data = [];

                        //console.log(responseModel, "responseModel on reports 2");
                        return responseModel;                        
                    });
            },
            () => {
                super.isRequestProcessing = false;
                this.reportOptions.data = [];
                this.reportOptions.responseId = responseId;

                return Promise.resolve(false);
            });     
    }

    openReport(responseId, reportId) {
        super.redirectTo(["AddReport", { id: responseId, reportId: reportId  }])
    }

    createReport(responseId) {
        super.redirectTo(["CreateReport", { id: responseId}])
    }

    setReportsGridOptions() {
        this.reportOptions = GridOptions.options.reportOptions;
        this.reportOptions.appScopeProvider = this;
        this.reportOptions.isGridReady = true;
        this.reportOptions.data = [];
    }
}

ReportsController.$inject = ["$window", "$injector", "reportsService", "responseService"];