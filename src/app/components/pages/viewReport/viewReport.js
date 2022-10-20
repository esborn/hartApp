import template from "./viewReport.html";
import controller from "./ViewReportController";

let viewReport = {
    template,
    controller,
	controllerAs: "ctrl",
	bindings: {
		main: "="
	}
};

export default viewReport;

