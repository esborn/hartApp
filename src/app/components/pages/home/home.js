import template from "./home.html";
import controller from "./HomeController";

let home = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default home;

