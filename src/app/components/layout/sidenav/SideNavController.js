import menuFeatures from "./menuFeatures";
import BaseComponentController from "../../common/BaseComponentController";

export default class SideNavController extends BaseComponentController{
    constructor(sideNavService) {
        super();
        this.sideNavService = sideNavService;
        this.menuItems = menuFeatures.menuItems;
    }

    getWidth() {
        return this.sideNavService.isSideNavHidden ?
        {
            "width": "57px",
            "max-width" : "180px"
        } : {
            "width": "180px",
            "max-width" : "180px"
        }
    }
}

SideNavController.$inject = ["sideNavService"];

