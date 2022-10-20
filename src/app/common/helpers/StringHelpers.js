export default class StringHelpers {
    static isNullOrEmpty(value) {
        return !value || value === "";
    }

    static includes( source, str ) {
        if (!source){
            source = "";
        }

        if (!str){
            str = "";
        }

        return source.toLowerCase().includes(str.toLowerCase());
    }

    static endsWith(source, suffix) {
        if (!source){
            source = "";
        }

        if (!suffix){
            suffix = "";
        }

        return source.toLowerCase().endsWith(suffix.toLowerCase());
    }
}