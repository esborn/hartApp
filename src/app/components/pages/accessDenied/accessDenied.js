import template from "./accessDenied.html";
import controller from "./AccessDeniedController";

let component = {
	template,
	controller,
	controllerAs: "ctrl",
	bindings: {
		$router: "<"
	}
};

export default component;