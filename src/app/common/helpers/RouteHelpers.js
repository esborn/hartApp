import StringHelpers from "../helpers/StringHelpers";

export default class RouteHelper{
    static isAdd(route){
        return StringHelpers.includes(route.urlPath, "add/");
    }

    static isEdit(route){
        return StringHelpers.includes(route.urlPath, "edit/");
    }

    static isApproval(route) {
        return StringHelpers.includes(route.urlPath, `approval/`);
    }

    static isDetails(route){
        return StringHelpers.includes(route.urlPath, `details/`);
    }
}
