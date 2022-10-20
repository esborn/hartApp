import BaseController from "../../common/BaseController";
import ApprovalStatuses from "../../../common/enums/approvalStatuses.json";
import ResponseModel from "../../../common/models/ResponseModel";
import DateUtils from "../../../common/helpers/DateUtils";
import AttachmentsOptions from "../../../common/enums/attachmentsOptions";
import Gender from "../../../common/enums/gender.json";


export default class AddReportController extends BaseController {
    constructor($window, $injector, responseService, reportsService, toastService) {
        super($injector);

        super.router = this.$router;
        this.responseService = responseService;
        this.reportsService = reportsService;
        this.ApprovalStatuses = ApprovalStatuses;
        this.gender =Gender;

        this.attachmentsOptions = AttachmentsOptions.empty;

        this.toastService = toastService;
        this.$window = $window;
        this.responseModel = new ResponseModel();

        this.readOnly = null;
        this.approve = false;
        this.reject = false;
        this.submit = false;
        this.saveDraft = false;
        this.convertToDraft = false;

        this.code = "";
        this.responseStatus = "";
        this.country = "";
        this.region = "";
        this.description = "";
        this.isHumanitarianPlanTargetIncluded =false;
        this.staffAreAwareOfGBV = ['Child Protection', 'Education', 'FSL', 'WASH', 'Shelter', 'Health','Nutrition'];
        this.auditAndAssessment = ['Not Conducted', 'Monthly', 'Quarterly', 'Bi-annually', 'Annually'];
        this.regularlyDistribut = ['Child Protection', 'Education', 'FSL', 'WASH', 'Shelter', 'Health','Nutrition'];
        this.technicalAdvisorsAreAware = {
                            "Child Protection": "Child Protection",
                            "Education": "Education",
                            "FSL":"FSL",
                            "WASH":"WASH",
                            "Shelter":"Shelter",
                            "Health":"Health",
                            "Nutrition": "Nutrition"
                            };
        //this.technicalAdvisorsAreAware = ['Child Protection', 'Education', 'FSL', 'WASH', 'Shelter', 'Health','Nutrition'];
        this.searchTerm = '';

          this.maxDate = new Date();
          this.sitrepDate = new Date();
    }

    $routerOnActivate(next, current) {
        super.permissions = [super.appPermissions.everyone];

        let init = () => {
            if (super.$routerOnActivate(next, current)) {
                this.activate(next.params.id, next.params.reportId);
            }
        };

        return super.initializePage(init);
    }

    activate(responseId, reportId) {


        return super.initializePageData(this.loadResponseDetails(responseId, reportId));
    }

  

    loadResponseDetails(responseId, reportId) {
        super.isRequestProcessing = true;

        this.responseService.getResponse(responseId)
            .then(
                (responseData) => {
                    this.responseModel = this.responseService.buildModel(responseData);

                    if (reportId != null) {

                        this.reportsService.getReport(reportId)
                            .then(
                                (reportData) => {

                                    super.model = this.reportsService.buildModel(reportData)
                                    super.model.responseId = responseId;
                                    this.attachmentsOptions = AttachmentsOptions.reportDraftOptions(super.model.id);
                                    super.model = this.updateBools(super.model);

                                    switch (super.model.reportStatus) {
                                        case ApprovalStatuses.draft:
                                        case ApprovalStatuses.revertedToDraft:
                                            if (this.hasPermissions([super.appPermissions.admin])) {
                                                //admin has all actions, non-read only
                                                this.readOnly = false;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = true;
                                                this.saveDraft = true;
                                                this.convertToDraft = false;
                                            } else if (this.hasPermissions([super.appPermissions.contributor])) {
                                                this.readOnly = false;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = true;
                                                this.saveDraft = true;
                                                this.convertToDraft = true;
                                            } else if (this.hasPermissions([super.appPermissions.reviewer])) {
                                                this.readOnly = false;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = true;
                                                this.convertToDraft = false;
                                            } else if (this.hasPermissions([super.appPermissions.approver])) {
                                                //cannot view
                                                this.router.forceNavigate(['AccessDenied']);
                                            } else {
                                                //normal user can do nothing
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = false;
                                            }
                                            break;
                                        case ApprovalStatuses.submitted:
                                            if (this.hasPermissions([super.appPermissions.admin])) {
                                                //admin has read only and can change back to draft
                                                super.model = this.formatDatesForDisplay(super.model);
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = true;
                                            } else if (this.hasPermissions([super.appPermissions.approver])) {
                                                //approver can review read only and reject or approve
                                                this.readOnly = true;
                                                super.model = this.formatDatesForDisplay(super.model);
                                                this.approve = true;
                                                this.reject = true;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = false;
                                            } else if (this.hasPermissions([super.appPermissions.contributor])) {
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = true;
                                            } else if (this.hasPermissions([super.appPermissions.reviewer])) {
                                                super.model = this.formatDatesForDisplay(super.model);
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = false;
                                            } else {
                                                //normal user view read only
                                                super.model = this.formatDatesForDisplay(super.model);
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = false;
                                            }
                                            break;
                                        case ApprovalStatuses.approved:
                                            if (super.model.reportStatus === ApprovalStatuses.approved) {
                                                //read only for all
                                                super.model = this.formatDatesForDisplay(super.model);
                                                this.readOnly = true;
                                                this.approve = false;
                                                this.reject = false;
                                                this.submit = false;
                                                this.saveDraft = false;
                                                this.convertToDraft = true;
                                            }
                                            break;
                                        default:
                                            this.toastService.showToast('The status of this report is unrecognised, please contact a system administrator', 'app');
                                            super.redirectTo(["Reports", {
                                                id: responseId
                                            }])
                                    }

                                    this.attachmentsOptions.readOnly = this.readOnly;
                                });
                    } else {
                        //this is when a new report is created                        
                        super.model = this.reportsService.buildModel(responseData)
                        super.model.responseId = responseId;
                        super.model.id = "";

                        if (this.hasPermissions([super.appPermissions.admin])) {
                            //admin has all actions, non-read only
                            this.readOnly = false;
                            this.approve = false;
                            this.reject = false;
                            this.submit = true;
                            this.saveDraft = true;
                            this.convertToDraft = true;

                        } else if (this.hasPermissions([super.appPermissions.contributor])) {
                            //normal user can edit a draft
                            this.readOnly = false;
                            this.approve = false;
                            this.reject = false;
                            this.submit = true;
                            this.saveDraft = true;
                            this.convertToDraft = true;
                        }
                        else if (this.hasPermissions([super.appPermissions.reviewer])) {
                            //normal user can edit a draft
                            this.readOnly = false;
                            this.approve = false;
                            this.reject = false;
                            this.submit = false;
                            this.saveDraft = true;
                            this.convertToDraft = false;
                        } else if (this.hasPermissions([super.appPermissions.approver])) {
                            //cannot view
                            this.router.forceNavigate(['AccessDenied']);
                        }
                    }
                    this.code = this.responseModel.code;
                    this.responseStatus = this.responseModel.responseStatus;
                    this.country = this.responseModel.country;
                    this.region = JSON.parse(this.responseModel.region).region;
                    this.description = this.responseModel.description;
                    super.isRequestProcessing = false;
                    return super.model;
                },
                () => {
                    super.isRequestProcessing = false;
                    return Promise.resolve(false);
                });
    }

    updateBools(model) {
        if (model.assessment != null) {
            model.assessmentBool = true;
        }
        if (model.outline != null) {
            model.outlineBool = true;
        }
        if (model.strategy != null) {
            model.strategyBool = true;
        }
        if (model.plan != null) {
            model.planBool = true;
        }
        if (model.operationsControlReview != null) {
            model.operationsControlReviewBool = true;
        }
        if (model.realTimeReview != null) {
            model.realTimeReviewBool = true;
        }

        if (model.childProtectionBackstop != null || model.childProtectionSummary != null) {
            model.childProtectionBool = true;
        }
        if (model.educationBackstop != null || model.educationSummary != null) {
            model.educationBool = true;
        }
        
        

        if (model.fSLBackstop != null || model.fSLSummary != null) {
            if (model.fSLBackstop != "" || model.fSLSummary != "") {
                model.FSLBool = true;
            }
        }
        if (model.wASHBackstop != null || model.wASHSummary != null) {
            if (model.wASHBackstop != "" || model.wASHSummary != "") {
                model.wASHBool = true;
            }
        }
        if (model.mEALBackstop != null || model.mEALSummary != null) {
            if (model.mEALBackstop != "" || model.mEALSummary != "") {
                model.mEALBool = true;
            }
        }

        if (model.shelterBackstop != null || model.shelterSummary != null) {
            model.shelterBool = true;
        }
        if (model.healthBackstop != null || model.healthSummary != null) {
            model.healthBool = true;
        }
        if (model.nutritionBackstop != null || model.nutritionSummary != null) {
            model.nutritionBool = true;
        }
         if (model.girlOnlySafeSpaces != null || model.girlOnlySafeSpaces != "") {
            model.girlOnlySafeSpacesBool = true;
        }
        if (model.dignityKitsAreRegularlyDistribut != null || model.dignityKitsAreRegularlyDistribut != "") {
            model.dignityKitsAreRegularlyDistributBool = true;
        }
        if (model.genderAnalysis != null || model.genderAnalysis != "") {
            model.genderAnalysisBool = 'No';
        }
         if (model.frontlineStaffAreAwareOfGBV != null || model.frontlineStaffAreAwareOfGBV != "") {
            model.frontlineStaffAreAwareOfGBVBool = 'Yes';
        }
        if (model.staffCommunitiesAreAwareOfPSEAPo != null || model.staffCommunitiesAreAwareOfPSEAPo != "") {
            model.staffCommunitiesAreAwareOfPSEAPoBool = 'Yes';
        }
        if (model.targetedActivitiesToProtectEmpow != null || model.targetedActivitiesToProtectEmpow != "") {
            model.targetedActivitiesToProtectEmpowBool = 'Yes';
        }


        return model;

    }


    storeAsDraft(form) {

        super.isRequestProcessing = true;

        var model = super.model;  //this.reportsService.buildModel(super.model);
        model.reportStatus = ApprovalStatuses.draft;
        console.log("strategy In Place: ");
        console.log(model.strategyInPlace);
        if(model.strategyInPlace===null || model.strategyInPlace===false || !model.strategyInPlace)
        {
            model.strategyPeriodStart=null;
            model.strategyPeriodEnd = null;
        }

        if (model.id != "") {
            let storeResponsePromise = this.reportsService.update(model);
            storeResponsePromise.then(
                () => {
                    this.toastService.showToast('Report draft updated', 'app');
                    super.redirectTo(["Reports", {
                        id: model.responseId
                    }])
                },
                (errorData) => {
                    super.serverRequestErrors = errorData;
                });

        } else {
            let storeResponsePromise = this.reportsService.store(model);
            storeResponsePromise.then(
                () => {
                    this.toastService.showToast('Report draft updated', 'app');
                    super.redirectTo(["Reports", {
                        id: model.responseId
                    }])
                },
                (errorData) => {
                    super.serverRequestErrors = errorData;
                });
        }
    }

    submitReport(form) {
        super.IsSubmittedFormValid(form).then(() => {
            super.isRequestProcessing = true;

            var model = this.reportsService.buildModel(super.model);
            model.sitrepDate = new Date();
            model.reportStatus = ApprovalStatuses.submitted;

             if(model.strategyInPlace===null || model.strategyInPlace===false || !model.strategyInPlace)
                 {
                     model.strategyPeriodStart=null;
                     model.strategyPeriodEnd = null;
                 }

            if (model.id != "") {
                let storeResponsePromise = this.reportsService.update(model);
                storeResponsePromise.then(
                    () => {
                        this.toastService.showToast('Report submitted for approval', 'app');

                        super.redirectTo(["Reports", {
                            id: model.responseId
                        }])
                    },
                    (errorData) => {
                        super.serverRequestErrors = errorData;
                    });
            } else {
                let storeResponsePromise = this.reportsService.store(model);
                storeResponsePromise.then(
                    () => {
                        this.toastService.showToast('Report submitted for approval', 'app');
                        super.redirectTo(["Reports", {
                            id: model.responseId
                        }])
                    },
                    (errorData) => {
                        super.serverRequestErrors = errorData;
                    });
            }
        });
    }

    approveReport(form) {
        super.isRequestProcessing = true;
        var model = this.reportsService.buildModel(super.model);
        model.reportStatus = ApprovalStatuses.approved;

        let storeResponsePromise = this.reportsService.update(model);
        var newDraftModel = this.removeDataForNewDraft(model);
        storeResponsePromise.then(
            () => {
                //create draft for next with copied fields and increment sitrep number
                let storeResponsePromise = this.reportsService.store(newDraftModel);
                storeResponsePromise.then(
                    () => {
                        this.toastService.showToast('Report approved', 'app');
                        super.redirectTo(["Reports", {
                            id: model.responseId
                        }])
                    },
                    (errorData) => {
                        super.serverRequestErrors = errorData;
                    });
            },
            (errorData) => {
                super.serverRequestErrors = errorData;
            });
    }

    rejectReport(form) {
        super.isRequestProcessing = true;
        var model = this.reportsService.buildModel(super.model);
        model.reportStatus = ApprovalStatuses.revertedToDraft;
        let storeResponsePromise = this.reportsService.update(model);
        storeResponsePromise.then(
            () => {
                this.toastService.showToast('Report rejected, please notify the report creater', 'app');

                super.redirectTo(["Reports", {
                    id: model.responseId
                }])
            },
            (errorData) => {
                super.serverRequestErrors = errorData;
            });
    }

    revertToDraft(form) {
        super.isRequestProcessing = true;
        var model = this.reportsService.buildModel(super.model);
        model.reportStatus = ApprovalStatuses.revertedToDraft;

        let storeResponsePromise = this.reportsService.update(model);
        storeResponsePromise.then(
            () => {
                this.toastService.showToast('Report reverted to draft', 'app');

                super.redirectTo(["Reports", {
                    id: model.responseId
                }])
            },
            (errorData) => {
                super.serverRequestErrors = errorData;
            });
    }

    refreshAugmentedData(form) {
        super.isRequestProcessing = true;
        var model = this.reportsService.buildModel(super.model);
        model.reportStatus = ApprovalStatuses.submitted;

        //create new report with existing data
        let storeResponsePromise = this.reportsService.store(model);
        storeResponsePromise.then(
            () => {
                let deletePreviousApproved = this.reportsService.deleteReport(model.id);
                deletePreviousApproved
                    .then(
                        () => {
                            this.toastService.showToast('New augmented data will be available to review through the portal', 'app');
                            super.isRequestProcessing = false;
                            super.redirectTo(["Reports", {
                                id: model.responseId
                            }])
                        },
                        (errorData) => {
                            super.serverRequestErrors = errorData;
                        });
            },
            (errorData) => {
                super.serverRequestErrors = errorData;
            });
    }


    formatDatesForDisplay(model) {
        model.sitrepDate = DateUtils.format(model.sitrepDate);
        model.nextSitrepDate = DateUtils.format(model.nextSitrepDate);
        if(model.strategyInPlace!= true)
        {
        model.strategyPeriodStart = null;
        model.strategyPeriodEnd = null;
        }
        else{
        model.strategyPeriodStart = DateUtils.format(model.strategyPeriodStart);
        model.strategyPeriodEnd = DateUtils.format(model.strategyPeriodEnd);
        }

        model.seedFundsTargetDate = DateUtils.format(model.seedFundsTargetDate);
        if (model.eHUDeployed != true) {
            model.eHUDeployedDate = null;
            model.eHUDeployedUntilDate = null;
        } else {
            model.eHUDeployedDate = DateUtils.format(model.eHUDeployedDate);
            model.eHUDeployedUntilDate = DateUtils.format(model.eHUDeployedUntilDate);
        }
        return model;
    }

    removeDataForNewDraft(model) {
        //this nulls any field that is not to be copied to the next report
        model.sitrepNumber++;

        model.reportComments = null;
        model.id = null;
        model.userId = null;
        model.userEmail = null;
        model.lastModifiedUserName = "Auto generated draft";
        model.reportStatus = ApprovalStatuses.draft;

        //General info
        model.sitrepDate = model.nextSitrepDate;
        model.nextSitrepDate = null;
        model.responseUpdateInternal = null;
        model.responseUpdateExternal = null;
        model.challengesInternal = null;

        //Reach figures
        model.totalReachSinceStart = null;
        model.totalReachSinceLastSitrep = null;
        model.childrenReachedSinceStart = null;
        model.childrenReachedSinceLastSitrep = null;
        model.totalReachInCurrentYear = null;
        model.childrenReachInCurrentYear = null;

        // //Sectors
        model.childProtectionSummary = null;
        model.educationSummary = null;
        model.fSLSummary = null;
        model.wASHSummary = null;
        model.shelterSummary = null;
        model.healthSummary = null;
        model.nutritionSummary = null;

        //Safety and security
        model.securityContext = null;

        //Child safegaurding
        model.safegaurdingRisks = null;

        //Advanced Media and Comms
        model.mediaCoverage = null;
        model.advocacyActions = null;

        // //Non SCI responses
        // this.securedIncome = null;
        // this.newAwards = null;
        // this.responsePipeline = null;
        // this.responsePipelineAppeal = null;
        // this.seedFundsSecured = null;
        // this.seedFundsSecuredYearly = null;
        // this.cSF = null;
        // this.responseTotalSpend = null;
        // this.totalSpendAgainstCSF = null;
        // this.totalSpendThroughPartners = null;
        // this.totalSpendThroughCTP = null;
        // this.totalSpendEducation = null;

        return model;
    }
}

AddReportController.$inject = ["$window", "$injector", "responseService", "reportsService", "toastService"];