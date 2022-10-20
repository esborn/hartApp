import template from "./menuToggle.html"
import controller from "./MenuToggleController"

let menuToggle = {
	template,
	controller,
	controllerAs : "ctrl",
	bindings: {
		section: "="
	}
};

export default menuToggle;
