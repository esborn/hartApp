import nestedProperty from "nested-property";
import equals from "equals";
import angular from "angular";

export default class ObjectUtils {
    static getProperty(obj, path) {
        return nestedProperty.get(obj, path)
    }

    static equals(obj1, obj2) {
        return equals(angular.copy(obj1), angular.copy(obj2));
    }

    static clone(obj) {
        return angular.copy(obj);
    }
}

