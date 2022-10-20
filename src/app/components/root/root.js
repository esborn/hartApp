import template from "./root.html";
import controller from "./RootController";
import routerConfig from "../../config/routerConfig";

let component = {
    template,
    controller,
    controllerAs: "ctrl",
    $routeConfig: routerConfig.getPaths()
};

export default component;