import DropZone from  "dropzone/dist/dropzone";
import previewTemplate from "./previewTemplate.html";

export default class FileUploadController {
    constructor($element, attachmentsDataAccessService, cache) {
        this.$element = $element;
        this.attachmentsDataAccessService = attachmentsDataAccessService;
        this.cache = cache.getById('attachmentsCache');

        this.activate();
    }

    activate() {
        this.uniqueId = this.uniqueId || "";

        var options = this.dropZoneOptions;
        options.maxFiles = this.maxFiles || this.dropZoneOptions.maxFiles;

        this.dropZone = new DropZone(this.$element[0].querySelector("div#container"), options);

        this.setDropZoneEvents();
    }

    setDropZoneEvents() {
        this.dropZone.on("addedfile", (file) => {
            angular.element(this.$element[0].querySelector(".errors #duplicateError")).addClass('hide');
            angular.element(this.$element[0].querySelector(".errors #isEmptyError")).addClass('hide');
            angular.element(this.$element[0].querySelector(".errors #maxFilesError")).addClass('hide');

            if(this.maxFiles && this.model.length >= this.maxFiles){
                angular.element(this.$element[0].querySelector(".errors #maxFilesError")).removeClass('hide');
                this.dropZone.removeFile(file);
                return;
            }

            if (file.size < 1) {
                angular.element(this.$element[0].querySelector(".errors #isEmptyError")).removeClass('hide');
                this.dropZone.removeFile(file);
                return;
            }

            let attachmentFiles = this.cache.get(this.uniqueId + 'attachments');

            if (!attachmentFiles) {
                attachmentFiles = [];
            }

            let duplicateFile = false;

            attachmentFiles.forEach((serverFile) => {
                if (serverFile.fileName === file.name) {
                    duplicateFile = true;
                }
            });

            if (duplicateFile) {
                angular.element(this.$element[0].querySelector(".errors #duplicateError")).removeClass('hide');
                this.dropZone.removeFile(file);
            }
            else {
                this.model.push(file);
            }
        });

        this.dropZone.on("removedfile", (file) => {
            let indexOf = this.model.findIndex(x => x == file);
            if(indexOf >= 0) {
                this.model.splice(indexOf, 1);
            }
        })
    }

    get dropZoneOptions() {
        let previews = document.querySelectorAll("#previews");
        let clickables = document.querySelectorAll("#selectFiles");

        return {
            url: "dummy",
            autoDiscover: false,
            maxFilesize: 1.3,
            paramName: "uploadfile",
            maxThumbnailFilesize: 1,
            maxFiles: 0,
            parallelUploads: 1,
            uploadMultiple: false,
            autoProcessQueue: false,
            previewTemplate: previewTemplate,
            previewsContainer: previews[previews.length - 1],
            clickable: clickables[clickables.length -1]
        };
    }
}

FileUploadController.$inject = ["$element", "attachmentsDataAccessService", "cache"];