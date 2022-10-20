import template from "./reports.html";
import controller from "./ReportsController";

let component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: '<'
    }
};

export default component;