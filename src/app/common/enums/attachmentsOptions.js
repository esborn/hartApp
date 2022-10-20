export default class AttachmentsOptions {
    static get empty(){
        return {
            listName: "",
            itemId: 0,
            uniqueId: ""
        }
    }

    static reportDraftOptions(itemId) {
        return {
            listName: "Reports",
            itemId: itemId,
            uniqueId: "rep"
        }
    }
}
