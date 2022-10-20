import Languages from "../enums/languages.json";

class LanguageCache {
    constructor() {
        this._language = Languages.en;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        if (value) {
            this._language = value;
        }
    }
}

let instance = new LanguageCache();

export default instance;
