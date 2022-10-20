import constants from "./objectMapperConstants.json";
import helper from "./AppHelpers";
import UserModel from "../models/UserModel";
import BaseModel from "../models/BaseModel";
import ArrayUtils from "./ArrayUtils";

export default class ObjectMapper {
    static toJson(object) {
        let jsonObject = {};

        let baseObject = new BaseModel();

        for (let prop in object) {
            if (object.hasOwnProperty(prop) && !baseObject.hasOwnProperty(prop)) {
                let propertyName = this.uppercaseFirstLetter(prop);
                if (prop !== constants.titlePropertyName) {
                    // propertyName = constants.prefix + propertyName;
                }

                let objValue = object[prop];

                if (object.multipleValuesProperties &&
                    object.multipleValuesProperties.includes(prop)) {

                    let jsonValue;

                    if (!objValue) {
                        jsonValue = { results: [] };
                    }
                    else if (objValue.results &&
                        Array.isArray(objValue.results)) {
                        jsonValue = objValue;
                    }
                    else if (Array.isArray(objValue)){
                        jsonValue = { results: objValue };
                    }
                    else {
                        jsonValue = { results: [] };
                    }

                    jsonObject[propertyName] = jsonValue;

                    continue;
                }

                jsonObject[propertyName] = (Array.isArray(objValue) || Object.prototype.toString.call(objValue) === '[object Object]') ?
                    JSON.stringify(objValue) :
                    objValue;
            }
        }

        return jsonObject;
    }

    static toObject(sourceObject, destinationObject, ignoreProperties) {
        if (Array.isArray(sourceObject) &&
            sourceObject.length > 0) {
            sourceObject = sourceObject[0];
        }

        for (let prop in sourceObject) {
            if (!sourceObject.hasOwnProperty(prop)) {
                continue;
            }

            let propertyName = this.lowercaseFirstLetter(prop.replace("", ""));
            if (!destinationObject.hasOwnProperty(propertyName) ||
                (ArrayUtils.contains(ignoreProperties, propertyName))) {
                continue;
            }

            if (Array.isArray(destinationObject[propertyName]) && !Array.isArray(sourceObject[prop])) {
                if (typeof(sourceObject[prop]) === 'object') {
                    destinationObject[propertyName].push(sourceObject[prop]);
                } else {
                    let value = JSON.parse(sourceObject[prop]);
                    if (Array.isArray(value)) {
                        destinationObject[propertyName] = JSON.parse(sourceObject[prop]);
                    }
                }
            } else {
                if (Object.prototype.toString.call(destinationObject[propertyName]) === '[object Object]') {
                    destinationObject[propertyName] =
                        typeof sourceObject[prop] == "object" ? sourceObject[prop] : JSON.parse(sourceObject[prop]);
                } else {
                    destinationObject[propertyName] = sourceObject[prop];
                }
            }
        }

        if (sourceObject.hasOwnProperty(constants.metadataFieldName) &&
            (!ArrayUtils.contains(ignoreProperties, 'etag'))) {
            destinationObject.etag = sourceObject[constants.metadataFieldName].etag;
        }

        return destinationObject;
    }

    static toAnonymous(data) {
        let result;

        if (Array.isArray(data)) {
            result = [];

            data.forEach((x) => {
                result.push(ObjectMapper.getAnonymousObject(x))
            })
        } else {
            result = ObjectMapper.getAnonymousObject(data);
        }

        return result;
    }

    static toUserModel(object) {
        let userModel = new UserModel();

        object = helper.transformResponse(object);

        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                let propertyName = this.lowercaseFirstLetter(prop);
                if (prop === constants.groupsFieldName) {
                    let groups = object.Groups.results;
                    for (let group in groups) {
                        userModel[propertyName].push(groups[group].Title);
                    }
                } else if (userModel.hasOwnProperty(propertyName)) {
                    userModel[propertyName] = object[prop];
                }
            }
        }

        return userModel;
    }

    static
    toUserModels(object) {
        let userModels = [];

        let arrayObjects = helper.transformResponse(object);

        for (let obj of arrayObjects) {
            userModels.push(ObjectMapper.toUserModel(obj));
        }

        return userModels;
    }

    static
    uppercaseFirstLetter(stringObject) {
        return stringObject.charAt(0).toUpperCase() + stringObject.slice(1);
    }

    static
    lowercaseFirstLetter(stringObject) {
        return stringObject.charAt(0).toLowerCase() + stringObject.slice(1);
    }

    static getAnonymousObject(obj) {
        let destObj = {};

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                let propertyName = this.lowercaseFirstLetter(prop.replace("", ""));
                destObj[propertyName] = obj[prop];
            }
        }

        return destObj;
    }
}