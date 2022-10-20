import BaseComponentController from "../../common/BaseComponentController";

const elemIdentifier = '.app-container';
const scrollToElemIdentifier = "#topElement";

export default class ScrollToTopController extends BaseComponentController {
    constructor( $timeout ) {
        super();

        this.$timeout = $timeout;
        this.isVerticalScroll = false;

        this.registerEvents();
    }

    scrollToTop() {
        window.jQuery(elemIdentifier).animate({scrollTop: window.jQuery(scrollToElemIdentifier).offset().top}, "slow");
    }

    registerEvents() {
        const self = this;

        window.jQuery(window.jQuery(elemIdentifier)).scroll(function () {
            if (window.jQuery(this).scrollTop() > 50) {
                if (!self.isVerticalScroll) {
                    self.verticalScroll = true;
                }
            } else {
                self.verticalScroll = false;
            }
        });
    }

    set verticalScroll( value ) {
        this.$timeout(() => {
            this.isVerticalScroll = value;
        })
    }
}

ScrollToTopController.$inject = ["$timeout"]