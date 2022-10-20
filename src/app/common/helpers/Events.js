import EventEmitter from "event-emitter";

class Events {
    constructor() {
        this.eventEmit = EventEmitter();
    }

    get Emitter(){
        return this.eventEmit;
    }
}

let instance = new Events();

export default instance;
