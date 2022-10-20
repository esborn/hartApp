import BaseController from "../../common/BaseController";
import GridOptions from "../../../common/enums/gridOptions";
import DateUtils from "../../../common/helpers/DateUtils";

export default class HomeController extends BaseController {
  constructor($window, $injector, responseService) {
    super($injector);

    super.router = this.$router;
    this.responseService = responseService;
    this.$window = $window;

    if (super.hasPermissions([super.appPermissions.admin])) {
      this.setResponseGridAdminOptions();
    } else {
      this.setResponseGridOptions();
    }
  }

  $routerOnActivate(next, current) {
    super.permissions = [super.appPermissions.everyone];

    let init = () => {
      if (super.$routerOnActivate(next, current)) {
        this.activate();
      }
    };

    return super.initializePage(init);
  }

  activate() {
    return super.initializePageData(this.getAllResponses());
  }

  openResponse(responseId) {
    super.redirectTo([
      "Reports",
      {
        id: responseId
      }
    ]);
  }

  editResponseCode(responseId) {
    super.redirectTo(["EditResponseCode", { id: responseId }]);
  }

  getAllResponses() {
    super.isRequestProcessing = true;

    return this.responseService.getAllResponses().then(
      (data) => {
        // console.log(data);
        if (super.hasPermissions([super.appPermissions.admin])) {
          var day;
          angular.forEach(data, function (row) {
            row.getSoDRemainingDays = function () {
              console.log("---------------------------------");

              console.log(this.SoDEndDate);
              console.log(DateUtils.getDisplaySoDDays(this.SoDEndDate));
              console.log(row.SoDCategory);
              day = DateUtils.getDisplaySoDDays(this.SoDEndDate);

              if (row.SoDCategory == "BAU") {
                day = "";
              }
              if (day <= 0 || this.SoDEndDate === null) {
                row.SoDCategory = "BAU";
                day = "";
              }
              return day;
            };

            row.Region = JSON.parse(row.Region).region;
          });

          this.responseCodeAdminOptions.data = data;
        } else {
          let day;
          angular.forEach(data, function (row) {
            row.getSoDRemainingDays = function () {
              console.log("---------------------------------");
              console.log(this.SoDEndDate);
              console.log(DateUtils.getDisplaySoDDays(this.SoDEndDate));
              console.log(row.SoDCategory);
              day = DateUtils.getDisplaySoDDays(this.SoDEndDate);
              day = DateUtils.getDisplaySoDDays(this.SoDEndDate);

              if (row.SoDCategory == "BAU") {
                day = "";
              }
              if (day <= 0 || this.SoDEndDate === null) {
                row.SoDCategory = "BAU";
                day = "";
              }

              return day;
            };

            // console.log(row.Region);
            row.Region = JSON.parse(row.Region).region;
          });

          this.responseCodeOptions.data = data;
        }

        super.isRequestProcessing = false;

        return Promise.resolve(true);
      },
      () => {
        super.isRequestProcessing = false;
        this.responseCodeOptions.data = [];

        return Promise.resolve(false);
      }
    );
  }

  setResponseGridOptions() {
    this.responseCodeOptions = GridOptions.options.responseCodeOptions;
    this.responseCodeOptions.appScopeProvider = this;
    this.responseCodeOptions.isGridReady = true;
    this.responseCodeOptions.data = [];
  }

  setResponseGridAdminOptions() {
    this.responseCodeAdminOptions =
      GridOptions.options.responseCodeAdminOptions;
    this.responseCodeAdminOptions.appScopeProvider = this;
    this.responseCodeAdminOptions.isGridReady = true;
    this.responseCodeAdminOptions.data = [];
  }
}

HomeController.$inject = ["$window", "$injector", "responseService"];
