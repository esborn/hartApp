export default class ModelHelpers {
    static getId(model, data){
        return model.id && model.id != "" ? model.id : data.Id;
    }

    static getTitle(model, data){
        return model.title && model.title != "" ? model.title : data.title;
    }
}