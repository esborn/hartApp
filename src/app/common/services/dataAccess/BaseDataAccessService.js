export default class BaseDataAccessService {
    constructor() {
        
    }
    
    addDigestProperty(config) {
        config = config || {};
        
        config['requiresDigest'] = true;
    }
    
    appendListItemTypeToRequestData(data, listName){
        data['__metadata'] = {
            "type": "SP.Data." + listName.replace(/ /g,'') + "ListItem"
        };

        return data;
    }
}