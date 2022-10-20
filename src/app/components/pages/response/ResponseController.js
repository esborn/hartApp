import BaseController from "../../common/BaseController";
import ResponseStatus from "../../../common/enums/responseStatus.json";
import SoDCategory from "../../../common/enums/SoDCategory.json";
import Phase from "../../../common/enums/phase.json";
import StrategyNumber from "../../../common/enums/strategyNumbers.json";
import ResponseCategory from "../../../common/enums/ResponseCategory.json";

import DateUtils from "../../../common/helpers/DateUtils";

export default class ResponseController extends BaseController {
  constructor($injector, responseService, toastService) {
    super($injector);

    super.router = this.$router;

    this.phase = Phase;
    this.responseService = responseService;
    this.responseStatus = ResponseStatus;
    this.soDCategory = SoDCategory;
    this.toastService = toastService;
    this.bauSelected = false;
    this.soDEndDate = new Date();

    this.status = {};
    this.strategyNumber = StrategyNumber;
    this.responseCategory = ResponseCategory;

    this.minDate = new Date(
      this.soDEndDate.getFullYear(),
      this.soDEndDate.getMonth(),
      this.soDEndDate.getDate()
    );

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 90);
  }

  $routerOnActivate(next, current) {
    super.permissions = [super.appPermissions.everyone];

    let init = () => {
      super.$routerOnActivate(next, current);
      return this.activate(next.params.id);
    };

    return super.initializePage(init);
  }

  activate(responseCodeId) {
    if (responseCodeId != null) {
      this.getResponse(responseCodeId);
      this.title = "Edit Response Code";
    } else {
      super.model = this.responseService.buildModel(undefined);
      this.title = "Create Response Code";

      //   this.pageLoadSodEndDate();
    }
    let pageData = this.responseService.loadPageData().then((data) => {
      this.countries = data[0];

      // this.regions = data[1];
    });

    return super.initializePageData(super.model, pageData);
  }

  loadRegions() {
    return this.responseService.commonDataService.loadRegions().then((data) => {
      this.regions = data;
    });
  }

  getResponse(responseCodeId) {
    super.isRequestProcessing = true;

    this.responseService.getResponse(responseCodeId).then(
      (data) => {
        super.isRequestProcessing = false;
        super.model = this.responseService.buildModel(data);

        this.pageLoadStatus(data[0].ResponseStatus, data[0].ResponseCategory);
        this.sodDaysRemaining = DateUtils.getDays2(data[0].SoDEndDate);

        if (
          this.sodDaysRemaining < 0 ||
          this.sodDaysRemaining > 90 ||
          data[0].SoDCategory == "BAU"
        ) {
          this.sodDaysRemaining = 0;
          this.soDEndDate = null;
        } else if (isNaN(this.sodDaysRemaining)) {
          this.sodDaysRemaining = 0;
          this.soDEndDate = DateUtils.today();
          this.soDEndDate = null;
        } else {
          this.sodDaysRemaining = this.sodDaysRemaining = DateUtils.getDays(
            data[0].SoDEndDate
          );
        }

        //   console.log(this.sodDaysRemaining);
        super.model.region = JSON.parse(super.model.region);
        this.loadRegions();
        return this.responseService.buildModel(data);
      },
      () => {
        super.isRequestProcessing = false;
        return Promise.resolve(false);
      }
    );
  }

  pageLoadStatus(responseStatus, responseCategory) {
    this.status = {
      responseStatus: responseStatus,
      responseCategory: responseCategory,
      title: this.title
    };
  }

  pageLoadStatusCheck() {
    if (
      (this.status.responseStatus === "Active" &&
        super.model.responseStatus === "Closed") ||
      this.status.responseCategory != super.model.responseCategory
    ) {
      return Promise.resolve(DateUtils.fullDate);
    }

    return Promise.resolve(null);
  }

  pageLoadSodEndDate() {
    this.calculateSoDDays();
  }

  setSoDDays(form) {
    // console.log(this.model.soDCategory);
    // console.log("cat");
    if (this.soDCategory == "BAU" || this.soDCategory === null) {
      this.sodDaysRemaining = 0;
      this.model.soDEndDate = this.model.startDate;
    } else {
      let vday = DateUtils.getDaysDifferenceTwoDates(
        this.model.soDEndDate,
        this.model.startDate
      );

      if (vday < 0) {
        this.toastService.showToast(
          "Response Start Date cannot be later than SoD_Category_End_Date",
          "app"
        );
        this.sodDaysRemaining = 0;
        this.model.soDCategory = "BAU";
        this.model.SoDCategory = "BAU";
        form.$dirty = false;
      } else if (
        this.model.soDCategory == null ||
        this.model.soDCategory == "BAU"
      ) {
        this.model.soDEndDate = null;
        this.toastService.showToast(
          "Cannot update SoD Days, please select SoD Category A or B",
          "app"
        );
      } else {
        this.calculateSoDDays();
        form.$dirty = true;
      }
    }
  }

  calculateSoDDays() {
    if (
      (this.sodDaysRemaining >= 0 && this.sodDaysRemaining <= 90) ||
      isNaN(this.sodDaysRemaining)
    ) {
      var newDate = DateUtils.CalculateSODDays(this.model.soDEndDate);
      this.model.soDEndDate = new Date(newDate);
      this.sodDaysRemaining = DateUtils.getDaysDifference(
        this.model.soDEndDate
      );
    } else if (this.sodDaysRemaining > 91) {
      this.sodDaysRemaining = 0;
      this.toastService.showToast("SoD End Date is invalid", "app");
    } else {
      this.toastService.showToast("Cannot update SoD Day", "app");
    }
  }

  setSODDate(form) {
    let vday = DateUtils.getDaysDifferenceTwoDates(
      this.model.soDEndDate,
      this.model.startDate
    );
    if (vday < 0) {
      this.toastService.showToast(
        "Response Start Date cannot be later than SoD_Category_End_Date",
        "app"
      );
      this.sodDaysRemaining = 0;
      this.model.SoDCategory = "BAU";
      form.$dirty = false;
    } else if (
      this.model.soDCategory == null ||
      this.model.SoDCategory == "BAU"
    ) {
      this.model.soDEndDate = null;
      this.toastService.showToast(
        "Cannot update SoD Days, please select SoD Category A or B",
        "app"
      );
    } else {
      this.calculateSoDDays();
      form.$dirty = true;
    }
  }

  updateSodDays(form) {
    let vday = DateUtils.getDaysDifferenceTwoDates(
      this.model.soDEndDate,
      this.model.startDate
    );
    if (vday < 0) {
      this.toastService.showToast(
        "Response Start Date cannot be later than SoD_Category_End_Date",
        "app"
      );
      this.sodDaysRemaining = 0;
      this.model.SoDCategory = "BAU";
      form.$dirty = false;
    } else {
      console.log(this.model.soDEndDate);
      this.sodDaysRemaining = DateUtils.getDays2(this.model.soDEndDate);
      console.log(this.sodDaysRemaining);
      if (
        (this.sodDaysRemaining >= 0 && this.sodDaysRemaining <= 90) ||
        isNaN(this.sodDaysRemaining)
      ) {
        this.sodDaysRemaining = DateUtils.getDays2(this.model.soDEndDate);
      } else {
        this.sodDaysRemaining = 0;
        this.toastService.showToast("SoD End Date is invalid", "app");
      }
    }
    //this.calculateSoDDays();
    //this.model.soDEndDate = null;
    form.$dirty = true;
  }

  getEmailAddr(form) {
    console.log(this.model);
  }

  storeResponse(form) {
    // Logging to check the form values

    super.IsSubmittedFormValid(form).then(() => {
      super.isRequestProcessing = true;

      console.log("saving SoDCategory");
      console.log(this.model);
      console.log(this.model.soDCategory);

      if (super.model.id != "") {
        //update existing
        if (
          this.model.soDCategory == null ||
          this.model.soDCategory == "" ||
          this.sodDaysRemaining == 0
        ) {
          super.model.SoDCategory = "BAU";
          super.model.SoDEndDate = null;
        }
        this.pageLoadStatusCheck().then((value) => {
          super.model.responseChangeDate = value;
          let storeResponsePromise = this.responseService.update(super.model);
          storeResponsePromise.then(
            () => {
              this.toastService.showToast("Response code updated", "app");
              super.redirectToHome();
            },
            (errorData) => {
              super.serverRequestErrors = errorData;
            }
          );
        });
      } else {
        //create new
        delete super.model.responseChangeDate;
        if (
          super.model.soDCategory == null ||
          super.model.soDCategory == "" ||
          this.sodDaysRemaining == 0
        ) {
          console.log("super.model.SoDCategory");
          console.log(super.model.SoDCategory);
          super.model.SoDCategory = "BAU";
          super.model.SoDEndDate = null;
        }
        super.model.emailAddress = super.model.region.emailAddress;
        let storeResponsePromise = this.responseService.store(super.model);

        storeResponsePromise.then(
          () => {
            this.toastService.showToast("Response code created", "app");
            super.redirectToHome();
          },
          (errorData) => {
            super.serverRequestErrors = errorData;
          }
        );
      }
    });
  }
}

ResponseController.$inject = ["$injector", "responseService", "toastService"];

//changed
