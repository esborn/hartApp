import template from "./users.html";
import controller from "./UsersController";

let users = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        $router: "<"
    }
};

export default users;