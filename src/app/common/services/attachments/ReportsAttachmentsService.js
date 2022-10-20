import RequestAttachmentsService from "./RequestAttachmentsService";

export default class ReportAttachmentsService extends RequestAttachmentsService {
    constructor(attachmentsDataAccessService) {
        super(attachmentsDataAccessService);
    }

    getAttachmentOptions(id, model) {
        return {
            files: model.uploadAttachments,
            storageName: 'Reports',
            id: id
        }
    }
    
}

ReportAttachmentsService.$inject = ["attachmentsDataAccessService"]