import ArrayUtils from "../../../common/helpers/ArrayUtils";
import ObjectUtils from "../../../common/helpers/ObjectUtils";
import FormUtils from "../../../common/helpers/FormUtils";
import EventsTypes from "../../../common/enums/eventsTypes.json";

import BaseComponentController from "../BaseComponentController";

export default class ListController extends BaseComponentController {
    constructor(modalService, $mdMedia, $filter) {
        super();

        this.modalService = modalService;
        this.$mdMedia = $mdMedia;
        this.$filter = $filter;
        this.options = this.options || {};

        if (this.options.readOnly) {
            this.options.isDeleteEnabled = false;
        }

        this.showAll = false;
        this.listItemOverflow = "overflowListItem";
        this.listItemMinWidth = "";
    }

    onItemClick(existingItem, $event) {
        if (this.options.readOnly) {
            if (this.options.modalViewForm) {
                this.modalService.showWizardModal(this.options.modalViewForm, $event, existingItem);
            }

            return;
        }

        super.emit(EventsTypes.listModelBeforeChange);

        this.modalService.showWizardModal(this.options.modalForm, $event, existingItem)
            .then((newItem) => {
                if (existingItem) {
                    ArrayUtils.update(this.model, existingItem, newItem);
                }
                else {
                    ArrayUtils.add(this.model, newItem);
                }

                FormUtils.setAsDirty(this.form);

                super.emit(EventsTypes.listModelAfterChange);
            });
    }

    onItemRemove(item) {
        ArrayUtils.remove(this.model, item);

        FormUtils.setAsDirty(this.form);

        super.emit(EventsTypes.listModelAfterChange);
    }

    isVisible(field) {
        return this.showAll ?
            true :
            field.showOn ? this.$mdMedia(field.showOn) : true;
    }

    displayProperty(obj, field) {
        let fieldValue = ObjectUtils.getProperty(obj, field.fieldName);

        const filter = field.filter;

        if (filter) {
            fieldValue = this.$filter(filter)(fieldValue);
        }

        return fieldValue;
    }

    triggerShowAll() {
        this.showAll = !this.showAll;

        this.listItemOverflow = !this.showAll ? "overflowListItem" : "";
        this.listOverflow = this.showAll ? "listOverflow" : "";
        this.listItemMinWidth = this.showAll ? {"min-width": this.options.displayFields.length * 150 + "px"} : "";
    }

    get isShowAllHidden() {
        if (this.options.hideShowAllOn === false)
        {
            return true;
        }

        return this.options.hideShowAllOn ? this.$mdMedia(this.options.hideShowAllOn) : true;
    }
}

ListController.$inject = ["modalService", "$mdMedia", "$filter"];