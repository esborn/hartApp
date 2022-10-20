import BaseComponentController from "../../BaseComponentController";
import EventsTypes from "../../../../common/enums/eventsTypes.json";

export default class AccordionController extends BaseComponentController {
    constructor() {
        super();

        this.isContentVisible = false;
    }

    toggleContent() {
        this.isContentVisible = !this.isContentVisible;

        super.emit(EventsTypes.toggleAccordion, this.isContentVisible);
    }
}