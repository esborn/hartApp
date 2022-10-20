import template from "./toggleSection.html"
import controller from "./ToggleSectionController"

let accordion = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings:{
        heading: "@"
    },
    transclude: true
};

export default accordion;