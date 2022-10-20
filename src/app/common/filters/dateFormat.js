import DateUtils from "../helpers/DateUtils";
import LanguageCache from "../services/LanguageCache";

let format = () => {
    return (input) => {
        return !input || input === "" ? "" : DateUtils.format(input, LanguageCache.language);
    }
};

export default format;