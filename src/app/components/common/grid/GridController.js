import EventsTypes from "../../../common/enums/eventsTypes.json";

import BaseComponentController from "../BaseComponentController";

export default class GridController extends BaseComponentController{
    constructor($scope, $element, $mdMedia, $timeout) {
        super();

        this.$scope = $scope;
        this.$element = $element;
        this.$mdMedia = $mdMedia;

        this.$timeout = $timeout;

        this.selectedNumber = 0;
        this.pageSize = 10;
        this.isDeleteProcessing = false;

        this.activate();

        this.registerEvents();
    }

    activate() {
        this.options.onRegisterApi = ( gridApi ) => {
            this.$scope.gridApi = gridApi;

            gridApi.core.on.rowsRendered(this.$scope, () => {
                gridApi.selection.clearSelectedRows();
                this.selectedNumber = 0;
            });

            gridApi.selection.on.rowSelectionChanged(this.$scope, () => {
                this.selectedNumber = gridApi.selection.getSelectedRows().length;

                super.emit(EventsTypes.gridSelectedRows, gridApi.selection.getSelectedRows());
            });

            gridApi.selection.on.rowSelectionChangedBatch(this.$scope, () => {
                this.selectedNumber = gridApi.selection.getSelectedRows().length;

                super.emit(EventsTypes.gridSelectedRows, gridApi.selection.getSelectedRows());
            });

            gridApi.pagination.on.paginationChanged(this.$scope,
                ( newPage, pageSize ) => {
                    this.pageSize = pageSize;
                });
        }
    }

    search() {
        this.searchAction();
    }

    reset() {
        this.resetAction();
    }

    registerEvents() {
        let deleteGridEvent = (data) => {
            this.$timeout(() => {
                this.isDeleteProcessing = data[0];
            })
        }

        let filterGridEvent = (data) => {
            this.$timeout(() => {
                this.isFilterProcessing = data[0];
            })
        }

        super.setListener(EventsTypes.deleteGridEvent, deleteGridEvent);
        super.setListener(EventsTypes.filterGridEvent, filterGridEvent);
    }

    get isShowAllHidden() {
        if (this.options.data && this.options.data.length > 0) {
            return this.options.showExpandButtonAlways ? false : this.$mdMedia("gt-md");
        }

        return true;
    }

    get isDeleteToolbarVisible() {
        return this.options.showDelete && this.options.data && this.options.data.length > 0;
    }
    
    getHeight() {
        var rows = 0;
        var headerHeight = 60;
        var rowHeight = 30;
        var footerHeight = 32;
        var buffer = 25;
        var scrollbarHeight = 15;

        if (this.options && this.options.data) {
            rows = (this.options.data.length <= this.pageSize ? this.options.data.length : this.pageSize) * rowHeight;
        }

        var height = headerHeight + rows + footerHeight + buffer;
        if (this.$scope.horizontalScrollbar === true) {
            height += scrollbarHeight;
        }

        height += 21;
        return {height: height + "px"}
    }

    deleteSelected() {
        if (this.options.showDelete) {
            this.$scope.gridApi.grid.appScope[this.options.deleteAction]();
        }
    }

    triggerShowAll() {
        this.showAll = !this.showAll;

        this.overflowContent = this.showAll ? {"overflow-x": "scroll"} : "";
        this.minWidthContent = this.showAll ? {"min-width": this.options.columnDefs.length * 150 + "px"} : "";
    }
}

GridController.$inject = ["$scope", "$element", "$mdMedia", "$timeout"];