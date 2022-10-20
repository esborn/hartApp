class GlobalFeaturesCache {
    constructor() {
        this._profileFeatures = {
            hasProfile: false
        };

        this._isAppRunning = false;
    }

    get hasProfile() {
        return this._profileFeatures.hasProfile;
    }

    set hasProfile(value) {
        if (value) {
            this._profileFeatures.hasProfile = value;
        }
    }

    get isAppRunning() {
        return this._isAppRunning;
    }

    set isAppRunning(value) {
        if (value) {
            this._isAppRunning = value;
        }
    }
}

let instance = new GlobalFeaturesCache();

export default instance;
