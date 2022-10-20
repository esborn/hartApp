import template from "./fileUpload.html";
import controller from "./FileUploadController";

let component = {
    template,
    controller,
    controllerAs: "ctrl",
    bindings: {
        model: "=ngModel",
        options: "<",
        uniqueId: "@",        
        maxFiles: "<"                
    }
};

export default component;

