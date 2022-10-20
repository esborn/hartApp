import template from "./grid.html";
import controller from "./GridController";

let grid = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings:{
        options:"<",
        searchAction: "&",
        resetAction: "&"
    }
};

export default grid;