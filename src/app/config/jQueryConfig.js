import jquery from "jquery";

export default class JQueryConfig {
    static config() {
        window.jQuery = jquery;
    }
}