export default class MenuToggleController {
    constructor(sideNavService) {
        this.sideNavService = sideNavService;
    }

    isOpen(section) {
        return this.sideNavService.isSectionSelected(section);
    }

    toggle(section) {
        if (this.sideNavService.isSideNavHidden) {
            this.sideNavService.isSideNavHidden = false;
            return;
        }
        this.sideNavService.toggleSelectSection(section);
    }

    isMenuClosed() {
        return this.sideNavService.isSideNavHidden;
    }

    getToggleIconClass(section) {
        return this.isOpen(section) ?
        {toggle: true} :
        {notoggle: true}
    }
}

MenuToggleController.$inject = ["sideNavService"];

