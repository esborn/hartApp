import template from "./dateFilter.html";
import controller from "./DateFilterController";

let component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        model: "=ngModel",
        label: "@"
    }
};

export default component;