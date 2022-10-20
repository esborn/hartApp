import EventsTypes from "../../common/enums/eventsTypes.json";
import ErrorHelpers from "../../common/helpers/ErrorHelpers";

import BaseComponentController from "./BaseComponentController";

export default class BaseController extends BaseComponentController {
    constructor($injector) {
        super();

        this._router = null;

        this._model = null;
        this._isRequestProcessing = false;
        this._permissions = null;
        this._serverErrors = [];

        this.$injector = $injector;
        this._navService = this.getNavService();
    }

    get router() {
        return this._router;
    }

    set router(value) {
        this._router = this._navService.getRouterWrapper(value);
    }

    get isRequestProcessing() {
        return this._isRequestProcessing;
    }

    set isRequestProcessing(value) {
        super.emit(EventsTypes.deleteGridEvent, value);
        super.emit(EventsTypes.filterGridEvent, value)

        this._isRequestProcessing = value;
    }

    get serverErrors() {
        return this._serverErrors;
    }

    set serverErrors(value) {
        this._serverErrors.push(value);
    }

    hasServerErrors() {
        return this.serverErrors.length > 0;
    }

    set model(value) {
        this._model = value;
    }

    get model() {
        return this._model;
    }

    set pageMode(value) {
        this._pageMode = value;
    }

    get pageMode() {
        return this._pageMode;
    }

    set permissions(values) {
        this._permissions = new Set(values);
    }

    get permissions() {
        return this._permissions ? [...this._permissions] : [];
    }

    set serverRequestErrors(value) {
        this.isRequestProcessing = false;

        this.serverErrors = value;

        if (!this.$injector) return;

        let serverErrormessage = ErrorHelpers.getErrorMessage(value);

        let toastService = this.$injector.get("toastService");
        toastService.showServerErrors(serverErrormessage);
    }


    getNavService() {
        if (this.$injector) {
            return this.$injector.get("navigationService");
        }

        return {};
    }

    $routerOnActivate(next, previous) {
        if (!this.$injector) return;

        const userService = this.$injector.get("userService");

        if (!userService.hasPermissions(this.permissions)) {
            this.router.forceNavigate(['AccessDenied']);

            return false;
        }

        return true;
    }

    isAdmin() {
        return this.hasPermissions([super.appPermissions.admin]);
    }

    isApprover() {
        return this.hasPermissions([super.appPermissions.approver]);
    }

    isUser() {
        return this.hasPermissions([super.appPermissions.everyone]);
    }

    getcurrentUser() {
        const userService = this.$injector.get("userService");

        return userService.getCurrentUser();
    }

    hasPermissions(permissions) {
        if (!this.$injector) return;

        const userService = this.$injector.get("userService");

        return userService.hasPermissions(permissions);
    }

    $routerCanDeactivate() {
        this.startSpinner();

        return true;
    }

    initializePage(action) {
        if (typeof action != 'function') {
            throw "Initialize page needs a function as argument"
        }

        let initPageActionPromise = Promise.resolve(action())
            .then(
                () => {
                    if (this.hasServerErrors()) {
                        this.redirectToHome();
                    } else {
                        this.stopSpinner();
                    }
                },
                () => {
                    this.stopSpinner();
                });

        return initPageActionPromise;
    }

    initializePageData(...promises) {
        return Promise.all(promises);
    }

    startSpinner() {
        super.emit(EventsTypes.loading, true);
    }

    stopSpinner() {
        super.emit(EventsTypes.loading, false);
    }

    IsSubmittedFormValid(form) {
        form.submitted = true;

        if (form.$valid) {
            return Promise.resolve();
        }

        if (!this.$injector) return;

        const toastService = this.$injector.get("toastService");
        toastService.showToast("Please complete all required fields");

        return Promise.reject();
    }

    redirectToHome() {
        this.redirectTo(["Home"])
    }

    redirectTo(route) {
        let $timeout = this.$injector.get("$timeout");

        $timeout(() => {
            this.isRequestProcessing = false;
            this.stopSpinner();

            this.router.forceNavigate(route)
        });
    }

    isFieldErrorVisible(form, fieldName) {
        return form && (form.submitted || form[fieldName].$touched);
    }
}