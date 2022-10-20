import dataAccessConfig from "./reportsDataAccessConfig.json";
import helper from "../../../helpers/AppHelpers";
import mapper from "../../../helpers/ObjectMapper";
import BaseDataAccessService from "../BaseDataAccessService";
import QueryBuilder from "../../../queryUtils/QueryBuilder";

export default class ReportsDataAccessService extends BaseDataAccessService {
    constructor($http) {
        super();
        this.$http = $http;

        this.queryBuilder = new QueryBuilder();
    }

    getReport(id) {
        let listName = "Reports";

        let replacements = {
            "{ID}": id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.getReport, replacements);

        let url = this.queryBuilder
            .queryValue(requestUrl)
            .selectAll()
            .build();

        return this.$http.get(url);
    }


    getAllReports(responseId) {

        let listName = "Reports";

        let replacements = {
            "{ID}": responseId,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.getAllReports, replacements);

        let url = this.queryBuilder
            .queryValue(requestUrl)
            .selectAll()
            .build();

        return this.$http.get(url);
    }

    save(data) {
        let listName = "Reports";

        let replacements = {
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.addReport, replacements);

        data = mapper.toJson(data);

        data = super.appendListItemTypeToRequestData(data, listName);

        data = JSON.stringify(data);

        let config = {};

        super.addDigestProperty(config);

        return this.$http.post(requestUrl, data, config);
    }

    update(data) {
        let listName = "Reports";

        let replacements = {
            "{ID}": data.id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.updateReport, replacements);

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

    deleteReport(id) {
        let listName = "Reports";

        let replacements = {
            "{ITEM_ID}": id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.delete, replacements);

        let config = {
            headers: {
                "X-HTTP-Method": "DELETE",
                "If-Match": "*"
            }
        };

        super.addDigestProperty(config);

        return this.$http.post(requestUrl, {}, config);
    }
}

ReportsDataAccessService.$inject = ["$http"];