export default class BaseModel{
    constructor(){
        this.id = "";
        this.etag = "";
    }
    
    excludeProperties(properties) {
        properties.forEach((property) => {
           Object.defineProperty(this, property, {
               writable: true,
                configurable: true,
                enumerable: false
           }); 
        });
    }
}