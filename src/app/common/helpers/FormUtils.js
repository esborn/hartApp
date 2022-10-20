export default class FormUtils {
    static setAsDirty(form) {
        if (form) {
            form.$setDirty();
        }
    }

    static setPropertyAsTouched(form, prop) {
        if (form && form[prop]) {
            form[prop].$touched = true;
        }
    }

    static invalidateProperty(form, prop, error) {
        if (form && form[prop]){
            form[prop].$setValidity(error, false);
        }
    }

    static validateProperty(form, prop, error) {
        if (form && form[prop]){
            form[prop].$setValidity(error, true);
        }
    }
}