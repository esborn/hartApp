import angular from "angular";
import toastTemplate from "./templates/toastTemplate.html";

export default class ToastService {
    constructor($mdToast) {
        this.$mdToast = $mdToast;
    }

    showServerErrors(message) {
        if(message.includes("The request ETag value")){
            message = "Sorry another user has edited this at the same time, please copy any changes externally and refresh the page to save";            
        }
        let options = this.getToastOptions(message);
        options.hideDelay = false;

        this.$mdToast.show(options);
    }

    showToast(messages, parent, position) {
        let options = this.getToastOptions(messages, parent, position);

        this.$mdToast.show(options);
    }

    showToastWithoutAutoHide(messages, parent, position) {
        let options = this.getToastOptions(messages, parent, position);
        options.hideDelay = false;

        this.$mdToast.show(options);
    }

    getToastOptions(messages, parent = "app", position) {
        return {
            hideDelay   : 3000,
            position    : position || 'top left',
            bindToController: true,
            controller: angular.noop,
            controllerAs: "ctrl",
            locals: {
                toast: this.$mdToast,
                messages: this.wrapMessages(messages)
            },
            template: toastTemplate,
            parent      : angular.element(document.body).find(parent)
        }
    }

    wrapMessages(messages){
        if (!Array.isArray(messages)) {
            return [messages];
        }

        return messages;
    }
}

ToastService.$inject = ['$mdToast'];
