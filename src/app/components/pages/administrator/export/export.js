import template from "./export.html";
import controller from "./ExportController";

let exportComponent = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default exportComponent;