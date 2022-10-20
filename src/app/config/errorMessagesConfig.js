import angular from "angular";

export default class ErrorMessagesConfig {
    static config() {
        const app = angular.module("omt");

        app.run(($templateCache) => {
            $templateCache.put('error-messages',
                `<div ng-message='required'>{{'REQUIRED_VALIDATION' }}</div>
                 <div ng-message='maxlength'>{{'LONG_MESSAGE_VALIDATION' }}</div>
                 <div ng-message='min'>{{'MIN_MESSAGE_VALIDATION' }}</div>
                 <div ng-message='max'>{{'MAX_MESSAGE_VALIDATION' }}</div>
                 <div ng-message='email'>{{'EMAIL_MESSAGE_VALIDATION'}}</div>`);
        })
    }
}
