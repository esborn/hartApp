import template from "./responseCodesList.html";
import controller from "./ResponseCodesListController";

let responseCodesList = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default responseCodesList;