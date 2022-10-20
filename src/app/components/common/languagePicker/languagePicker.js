import template from "./languagePicker.html";
import controller from "./LanguagePickerController";

let component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        model: "=ngModel",
        direction: "@",
        languages: "<"
    },
    require:{
        form: "?^form"
    }
};

export default component;