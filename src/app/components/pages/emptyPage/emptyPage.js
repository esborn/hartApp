import template from "./emptypage.html";
import controller from "./EmptyPageController";

let component = {
	template,
	controller,
	controllerAs: "ctrl",
	bindings:{
		$router: "<"
	}
};

export default component;