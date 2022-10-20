import template from "./regions.html";
import controller from "./RegionsController";

let regions = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default regions;