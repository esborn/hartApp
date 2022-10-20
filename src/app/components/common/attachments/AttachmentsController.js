import ObjectMapper from "../../../common/helpers/ObjectMapper";
import ArrayUtils from "../../../common/helpers/ArrayUtils";
import ServerFileModel from "../../../common/models/ServerFileModel";

export default class AttachmentsController {
    constructor($scope, attachmentsDataAccessService, cache) {
        this.attachmentsDataAccessService = attachmentsDataAccessService;
        this.cache = cache.getById('attachmentsCache');

        $scope.$watch('ctrl.options', () => {
            this.activate();
        });
    }

    activate() {
        this.fileModels = [];

        if (!this.options.listName ||
            this.options.listName.length === 0 ||
            !this.options.itemId) {
            return;
        }

        let getItemAttachmentsPromise = this.attachmentsDataAccessService
            .getItemAttachmentsNames(this.options.listName, this.options.itemId);

        getItemAttachmentsPromise.then((results) => {
            results.forEach((fileResult) => {
                let serverFileModel = new ServerFileModel();
                this.fileModels.push(ObjectMapper.toObject(fileResult, serverFileModel));
            });

            this.onAttachmentsChange();
        });
    }

    downloadFile(file) {
        this.attachmentsDataAccessService.downloadItemAttachment(file.serverRelativeUrl, file.fileName);
    }

    deleteFile(file) {
        this.attachmentsDataAccessService
            .deleteItemAttachment(this.options.listName, this.options.itemId, file.fileName)
            .then(() => {
                ArrayUtils.remove(this.fileModels, file);
                this.onAttachmentsChange();
            });
    }

    onAttachmentsChange() {
        this.cache.put(this.options.uniqueId + 'attachments', this.fileModels);
    }
}

AttachmentsController.$inject = ["$scope", "attachmentsDataAccessService", "cache"]; 