export default class MenuLinkController {
    constructor(sideNavService) {
        this.sideNavService = sideNavService;
    }

    isMenuClosed() {
        return this.sideNavService.isSideNavHidden;
    }
}

MenuLinkController.$inject = ["sideNavService"];

