import template from "./response.html";
import controller from "./ResponseController";

let response = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default response;