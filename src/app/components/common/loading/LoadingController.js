import EventsTypes from "../../../common/enums/eventsTypes.json";

import BaseComponentController from "../BaseComponentController";

export default class LoadingController extends BaseComponentController {
    constructor() {
        super();

        let loadingListener = (values) => {
            document.getElementById("loading").style.display = values[0] ? "" : "none";
        };

        super.setListener(EventsTypes.loading, loadingListener);
    }
}