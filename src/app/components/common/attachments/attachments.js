import template from "./attachments.html";
import controller from "./AttachmentsController";

let attachments = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        fileModels: "=ngModel",
        options: "="
    }
};

export default attachments;