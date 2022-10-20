import template from "./reportsList.html";
import controller from "./ReportsListController";

let reportsList = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default reportsList;