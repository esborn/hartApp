import dataAccessConfig from "./responseCodeDataAccessConfig.json";
import helper from "../../../helpers/AppHelpers";
import mapper from "../../../helpers/ObjectMapper";
import BaseDataAccessService from "../BaseDataAccessService";
import QueryBuilder from "../../../queryUtils/QueryBuilder";

export default class ResponseCodeDataAccessService extends BaseDataAccessService {
    constructor($http) {
        super();
        this.$http = $http;

        this.queryBuilder = new QueryBuilder();
    }
   
    getResponse(id) {
        let listName = "Response Codes";

        let replacements = {
            "{ID}": id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.getResponse, replacements);

        let url = this.queryBuilder
            .queryValue(requestUrl)
            .selectAll()
            .build();

        return this.$http.get(url);
    }
    

    getAllResponses() {

        let requestUrl = dataAccessConfig.getAllResponses;

        return this.$http.get(requestUrl);
    }
    
    save(data) {
        let listName = "Response Codes";

        let replacements = {
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.addResponse, replacements);

        data = mapper.toJson(data);

        // console.log(data);

        data = super.appendListItemTypeToRequestData(data, listName);

       

        data = JSON.stringify(data);

        let config = {};

        super.addDigestProperty(config);

        return this.$http.post(requestUrl, data, config);
    }

    update(data) {
        let listName = "Response Codes";

        let replacements = {
            "{ID}": data.id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.updateResponse, replacements);

        let config = {
            headers: {
                "X-HTTP-Method": "MERGE",
                "If-Match":  data.etag
            }
        };

        super.addDigestProperty(config);

        data = mapper.toJson(data);

        data = super.appendListItemTypeToRequestData(data, listName);

        data = JSON.stringify(data);

        return this.$http.post(requestUrl, data, config);
    }
}

ResponseCodeDataAccessService.$inject = ["$http"];

//changed