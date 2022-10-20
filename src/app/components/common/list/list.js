import template from "./list.html";
import controller from "./ListController";

let list = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        model: "=ngModel",
        options: "<"
    },
    require:{
        form: "?^form"
    }
};

export default list;