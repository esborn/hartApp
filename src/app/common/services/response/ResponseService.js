import StringHelpers from "../../helpers/StringHelpers";
import ObjectMapper from "../../helpers/ObjectMapper";
import ResponseModel from "../../models/ResponseModel";
import DateUtils from "../../helpers/DateUtils";

export default class ResponseService {
  constructor(user, responseCodeDataAccessService, commonDataService) {
    this.user = user;
    this.responseCodeDataAccessService = responseCodeDataAccessService;
    this.commonDataService = commonDataService;
  }

  buildModel(data) {
    let model = new ResponseModel();

    if (data) {
      ObjectMapper.toObject(data, model);
      model.startDate = DateUtils.getFromString(model.startDate);
      model.strategyDate = DateUtils.getFromString(model.strategyDate);
      model.soDEndDate = DateUtils.getFromString(model.soDEndDate);
    }

    return model;
  }

  loadPageData() {
    return Promise.all([
      this.commonDataService.loadCountries(),
      this.commonDataService.loadRegions()
    ]);
  }

  store(model) {
    return this.responseCodeDataAccessService.save(model);
  }

  update(model) {
    return this.responseCodeDataAccessService.update(model);
  }

  getAllResponses() {
    return this.responseCodeDataAccessService.getAllResponses();
  }

  getResponse(id) {
    return this.responseCodeDataAccessService.getResponse(id);
  }
  getCurrentUserId(userId) {
    return userId ? userId : this.user.id;
  }

  getCurrentUserEmail(model) {
    return !StringHelpers.isNullOrEmpty(model.userEmail)
      ? model.userEmail
      : this.user.email;
  }
}

ResponseService.$inject = [
  "user",
  "responseCodeDataAccessService",
  "commonDataService"
];
