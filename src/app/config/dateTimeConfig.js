import angular from "angular";
import DateUtils from "../common/helpers/DateUtils";
import LanguageCache from "../common/services/LanguageCache";

export default class DateConfig {
    static config() {
        const app = angular.module("omt");

        app.config(($mdDateLocaleProvider) => {
            $mdDateLocaleProvider.parseDate = (dateString) => {
                return DateUtils.getFromString(dateString, LanguageCache.language);
            };

            $mdDateLocaleProvider.formatDate = (date) => {
                return DateUtils.format(date, LanguageCache.language);
            };
        });
    }
}
