import GlobalFeaturesCache from "../../../common/services/GlobalFeaturesCache";

export default class ToolbarController {
    constructor( sideNavService, modalService ) {
		this.sideNavService = sideNavService;
        this.modalService = modalService;
		this.isSideNavHidden = false;
	}

    showProfileMenu($mdOpenMenu, $event){
        $mdOpenMenu($event);
    }

	toggleSideNav(navID) {
		this.sideNavService.toggleSideNav(navID);
	}

    showProfileDelegateAccess() {
        this.modalService.showWizardModal(
            `<profile-delegate-access ng-model="ctrl.entityModel"></profile-delegate-access>`);
    }
    
    hasNotificationArrow() {
        return !GlobalFeaturesCache.hasProfile;
    }
}

ToolbarController.$inject = ["sideNavService", "modalService"];