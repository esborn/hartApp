import template from "./menuLink.html"
import controller from "./MenuLinkController"

let menuLink = {
	template,
	controller,
	controllerAs: "ctrl",
	bindings: {
		section: "="
	}
};

export default menuLink;
