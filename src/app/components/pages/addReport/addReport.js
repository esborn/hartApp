import template from "./addReport.html";
import controller from "./AddReportController";

let addReport = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default addReport;

