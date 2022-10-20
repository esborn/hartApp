export default class SideNavService {
    constructor($mdSidenav, $mdMedia) {
        this.$sideNav = $mdSidenav;
        this.$mdMediaService = $mdMedia;

        this.isSideNavHidden = this.$mdMediaService("max-width: 1280px");
    }

    toggleSideNav(navID) {
        this.isSideNavHidden = !this.isSideNavHidden;

        if (this.isSideNavHidden){
            this.openedSection = null;
        }
    }

    toggleSelectSection(section) {
        this.openedSection = (this.openedSection === section ? null : section);
    }

    isSectionSelected(section) {
        return this.openedSection === section;
    }
}

SideNavService.$inject = ["$mdSidenav", "$mdMedia"];