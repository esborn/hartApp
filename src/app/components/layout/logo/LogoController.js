import BaseComponentController from "../../common/BaseComponentController";
import externalUrls from "../../../common/enums/externalUrls.json";

export default class LogoController extends BaseComponentController {
    constructor() {
        super();

        this.saveTheChildrenUrl = externalUrls.saveTheChildren;
    }

}