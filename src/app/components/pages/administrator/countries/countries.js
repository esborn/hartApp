import template from "./countries.html";
import controller from "./CountriesController";

let countries = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default countries;