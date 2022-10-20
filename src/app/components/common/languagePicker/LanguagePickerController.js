import FormUtils from "../../../common/helpers/FormUtils";

export default class LanguagePickerController {
    constructor(cache) {
        this.cache = cache;

        this.languageOpen = true;
    }

    changeLanguage(language){
        this.model = language;

        FormUtils.setAsDirty(this.form);
    }
}

LanguagePickerController.$inject = ["cache"];
