import Events from "../../common/helpers/Events";
import Permissions from "../../common/enums/permissions.json";

export default class BaseComponentController {
    constructor() {
        this.customEventsListener = new Map();
        
    }

    setListener(key, action) {
        Events.Emitter.on(key, action);

        this.customEventsListener.set(key, action);
    }
    
    emit(key, ...args){
        Events.Emitter.emit(key, args);
    }

    get appPermissions() {
        return Permissions;
    }

    $onDestroy() {
        for (let [key, value] of this.customEventsListener) {
            Events.Emitter.off(key, value);
        }
    }
}