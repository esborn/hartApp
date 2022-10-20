import BaseController from "./BaseController";

export default class BaseModalController extends BaseController {
    constructor($injector){
        super($injector);
        
        this.$mdDialog = $injector.get("$mdDialog");
    }
    
    cancel() {
        super.isRequestProcessing = false;
        this.$mdDialog.cancel();
    }

    sendResponse(value) {
        this.$mdDialog.hide(value);
    }
}