import template from "./accordion.html"
import controller from "./AccordionController"

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