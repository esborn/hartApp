import BaseDataAccessService from "../BaseDataAccessService";
import dataAccessConfig from "./attachmentsDataAccessConfig.json";
import helper from "../../../helpers/AppHelpers";
import ArrayUtils from "../../../helpers/ArrayUtils";

export default class AttachmentsDataAccessService extends BaseDataAccessService {
    constructor($http, $q) {
        super();
        this.$http = $http;
        this.$q = $q;
    }

    upload(attachmentOptions) {
        let files = ArrayUtils.clone(attachmentOptions.files);

        return this.addAttachments(attachmentOptions, files);
    }

    copyTo(attachmentOptions) {
        let files = ArrayUtils.clone(attachmentOptions.files);

        return this.copyAttachments(attachmentOptions, files);
    }

    addAttachments(attachment, files) {
        let deferred = this.$q.defer();

        if (files.length <= 0) {
            let promise = deferred.promise;

            deferred.resolve();

            return promise;
        }

        let file = files.pop();

        let newFile = attachment.isBlob ?
        {content: file.content, name: file.name} :
        {content: file, name: file.name};

        let attachmentPromise = this.addAttachment(attachment, newFile);
        attachmentPromise.then(() => {
            this.addAttachments(attachment, files).then(() => {
                deferred.resolve();
            })
        });

        return deferred.promise;
    }

    addAttachment(attachment, file) {
        let replacements = {
            "{ID}": attachment.id,
            "{LIST_NAME}": attachment.storageName,
            "{FILE_NAME}": file.name
        };

        let requestUrl = helper.replaceData(dataAccessConfig.uploadAttachment, replacements);

        let config = {
            transformRequest: angular.identity,
            processData: false,
            setContentType: false,
            headers: {
                "Content-Type": undefined
            }
        };

        super.addDigestProperty(config);

        return this.getFileAsArray(file.content)
            .then((result) => {
                return this.$http.post(requestUrl, result, config);
            });
    }

    copyAttachments(attachment, files) {
        let deferred = this.$q.defer();

        let fileContentPromises = [];
        let fileNames = [];

        files.forEach((file) => {
            fileContentPromises.push(this.getItemAttachmentContent(file.serverRelativeUrl));
            fileNames.push(file.fileName);
        });

        Promise.all(fileContentPromises).then((results) => {
            let files = [];
            
            for (let i = 0; i < results.length; i++) {
                files.push({
                    name: fileNames[i],
                    content: results[i].data
                });
            }

            attachment.isBlob = true;

            this.addAttachments(attachment, files)
                .then(() => {
                    deferred.resolve(attachment.id);
                });
        });

        return deferred.promise;
    }

    getItemAttachmentsNames(listName, id) {
        let replacements = {
            "{ID}": id,
            "{LIST_NAME}": listName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.getItemAttachmentsNames, replacements);

        return this.$http.get(requestUrl);
    }

    getItemAttachmentContent(url) {
        let requestUrl = url;

        let config = {
            responseType: "blob",
            setSiteUrl: true,
            removeManagedPath: true,
            acceptHeaderSet: true,
            headers: {
                Accept: "*/*"
            }
        };

        return this.$http.get(requestUrl, config);
    }

    downloadItemAttachment(fileRelativeUrl, fileName) {
        if (this.isIE()) {
            this.getItemAttachmentContent(fileRelativeUrl)
                .then((fileData) => {
                    window.navigator.msSaveOrOpenBlob(fileData.data, fileName);
                });
        }
        else {
            let a = document.createElement("a");
            a.href = fileRelativeUrl;
            a.target = "_blank";
            a.download = fileName;
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        }
    }

    deleteItemAttachment(listName, itemId, fileName) {
        let replacements = {
            "{ID}": itemId,
            "{LIST_NAME}": listName,
            "{FILE_NAME}": fileName
        };

        let requestUrl = helper.replaceData(dataAccessConfig.deleteItemAttachment, replacements);

        let config = {
            headers: {
                "X-HTTP-Method": "DELETE"
            }
        };

        super.addDigestProperty(config);

        return this.$http.post(requestUrl, {}, config);
    }

    isIE() {
        return window.navigator.msSaveOrOpenBlob;
    }

    getFileAsArray(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onloadend = function (e) {
                resolve(e.target.result);
            };

            reader.onerror = function (e) {
                reject(e.target.error);
            };

            reader.readAsArrayBuffer(file);
        });
    }
}

AttachmentsDataAccessService.$inject = ["$http", "$q"];