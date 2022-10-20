import angular from "angular";
//import GlobalFeaturesCache from "../common/services/GlobalFeaturesCache";

export default class AppConfig {
    static config() {
        const app = angular.module("omt");

        app.config(($locationProvider, $mdThemingProvider) => {
            //Because html5 mode set to true doesn't work well in share point context, i will not enable it for the moment
            //$locationProvider.html5Mode(true);

            $mdThemingProvider.theme('menu').dark();
            $mdThemingProvider.theme('pageTheme')
                .primaryPalette("red");
        });

         app.run();
         //($injector) => {
        //     if (!GlobalFeaturesCache.hasProfile &&
        //         GlobalFeaturesCache.isAppRunning) {
        //     }
        // })
    }
}