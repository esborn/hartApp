import BaseComponentController from "../BaseComponentController";
import EventsTypes from "../../../common/enums/eventsTypes.json";

export default class AccordionController extends BaseComponentController {
    constructor() {
        super();

        this.isContentVisible = false;

        this.registerEvents();
    }

    toggleContent() {
        this.isContentVisible = !this.isContentVisible;
    }

    getToggleClass() {
        return this.isContentVisible ? { toggle: true } : { notoggle: true };
    }

    getButtonStyle() {
        return this.isContentVisible ? {"background-color": "rgba(158,158,158,0.5)"} : {};
    }

    registerEvents() {
        let toggleListener = (data) => {
            this.isContentVisible = data[0];
        }

        super.setListener(EventsTypes.toggleAccordion, toggleListener);
    }
}