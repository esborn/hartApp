export default class RequestAttachmentsService {
    constructor(attachmentsDataAccessService) {
        this.attachmentsDataAccessService = attachmentsDataAccessService;
    }

    storeAttachments(id, model) {
        return this.attachmentsDataAccessService.upload(this.getAttachmentOptions(id, model));
    }    
}