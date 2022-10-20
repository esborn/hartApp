import StringHelpers from "../../helpers/StringHelpers";
import ObjectMapper from "../../helpers/ObjectMapper";
import ReportsModel from "../../models/ReportsModel";
import DateUtils from "../../helpers/DateUtils";


export default class ReportsService {
    constructor(user, reportsDataAccessService, commonDataService, responseService, reportsAttachmentsService) {
        this.user = user;
        this.reportsDataAccessService = reportsDataAccessService;
        this.commonDataService = commonDataService;
        this.responseService = responseService;
        this.reportsAttachmentsService = reportsAttachmentsService;
    }

    buildModel(data) {
        let model = new ReportsModel();

        if (data) {
            ObjectMapper.toObject(data, model);
            model.sitrepDate = DateUtils.getFromString(model.sitrepDate);
            model.nextSitrepDate = DateUtils.getFromString(model.nextSitrepDate);
            model.seedFundsTargetDate = DateUtils.getFromString(model.seedFundsTargetDate); 
            model.eHUDeployedDate = DateUtils.getFromString(model.eHUDeployedDate); 
            model.eHUDeployedUntilDate = DateUtils.getFromString(model.eHUDeployedUntilDate);      
            model.strategyPeriodStart = DateUtils.getFromString(model.strategyPeriodStart);   
            model.strategyPeriodEnd = DateUtils.getFromString(model.strategyPeriodEnd);                 
        }
        return model;
    }    

    loadPageData() {
        return Promise.all([this.commonDataService.loadCountries(), this.commonDataService.loadRegions()]);
    }


    store(model) {        
        model.userEmail = this.user.email;
        model.userId = this.user.id;
        if(model.lastModifiedUserName != "Auto generated draft")
        {
        model.lastModifiedUserName = this.user.title;  
        }      
        return this.reportsDataAccessService.save(model).then(
            ( data ) => {
                return this.reportsAttachmentsService.storeAttachments(data.Id, model)
            },
            ( errorData ) => {
                return Promise.reject(errorData);
            });
    }

    // storeNonSci(model) {
    //     return this.reportsDataAccessService.saveNonSci(model);
    // }

    update(model){        
        model.userEmail = this.user.email;
        model.userId = this.user.id;
        model.lastModifiedUserName = this.user.title;                
        return this.reportsDataAccessService.update(model).then(
            ( data ) => {
                return this.reportsAttachmentsService.storeAttachments(model.id, model)
            },
            ( errorData ) => {
                return Promise.reject(errorData);
            });
    }

    deleteReport(id) {
        return this.reportsDataAccessService.deleteReport(id); 
    }

    getAllReports(responseId) {
        return this.reportsDataAccessService.getAllReports(responseId);
    }

    getReport(reportId) {
        return this.reportsDataAccessService.getReport(reportId);
    }

    // getNonSci(reportId) {
    //     return this.reportsDataAccessService.getNonSci(reportId);
    // }

    getCurrentUserId(userId) {
        return userId ? userId : this.user.id;
    }

    getCurrentUserEmail(model) {
        return !StringHelpers.isNullOrEmpty(model.userEmail) ? model.userEmail : this.user.email;
    }
}

ReportsService.$inject = ["user", "reportsDataAccessService", "commonDataService", "responseService", "reportsAttachmentsService"];