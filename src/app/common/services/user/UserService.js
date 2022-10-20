import userServiceConfig from "./userServiceConfig.json";
import helper from "../../helpers/AppHelpers";

export default class UserService {
    constructor($http, $injector) {
        this.$http = $http;
        this.$injector = $injector;
    }

    getCurrentUser() {
        let requestUrl = userServiceConfig.getCurrentUser;

        let config = {
            cache: true
        };

        return this.$http.get(requestUrl, config);
    }

    hasPermissions(permissions) {
        const user = this.$injector.get("user");

        let allowAccess = false;

        permissions.forEach((p) => {
            if (user.permissions.indexOf(p) > -1) {
                allowAccess = true;
            }
        });

        return allowAccess;
    }

    searchUsersInGroup(query, groupName) {
        let replacements = {
            "{GROUP}": groupName
        };

        let requestUrl = helper.replaceData(userServiceConfig.searchUsersInGroup, replacements);

        return this.searchUsers(requestUrl, query);
    }

    searchUsersInSite(query) {
        return this.searchUsers(userServiceConfig.searchUsers, query);
    }

    searchUsers(requestUrl, query) {

        requestUrl += userServiceConfig.usersQuery;

        let replacements = {
            "{QUERY}": query,
            "{USER_ID}": this.$injector.get("user").id
        };

        requestUrl = helper.replaceData(requestUrl, replacements);

        return this.$http.get(requestUrl);
    }

    searchUsersInGroupIncludingOwn(query, groupName) {
        let replacements = {
            "{GROUP}": groupName
        };

        let requestUrl = helper.replaceData(userServiceConfig.searchUsersInGroup, replacements);

        return this.searchUsersIncludingOwn(requestUrl, query);
    }

    searchUsersInSiteIncludingOwn(query) {
        return this.searchUsersIncludingOwn(userServiceConfig.searchUsers, query);
    }

    searchUsersIncludingOwn(requestUrl, query) {

        requestUrl += userServiceConfig.usersQueryIncludingOwn;

        let replacements = {
            "{QUERY}": query
        };

        requestUrl = helper.replaceData(requestUrl, replacements);

        return this.$http.get(requestUrl);
    }
}

UserService.$inject = ["$http", "$injector"];