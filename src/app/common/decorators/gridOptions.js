function gridDecorator($delegate, uiGridConstants) {
        var gridOptions;
        gridOptions = angular.copy($delegate);
        gridOptions.initialize = function (options) {
            var initOptions;
            initOptions = $delegate.initialize(options);

            initOptions.enableHorizontalScrollbar = initOptions.enableHorizontalScrollbar || uiGridConstants.scrollbars.NEVER;
            initOptions.enableVerticalScrollbar = initOptions.enableVerticalScrollbar || uiGridConstants.scrollbars.NEVER;

            initOptions.enablePaginationControls = true;
            initOptions.paginationPageSizes = [10, 25, 50];
            initOptions.paginationPageSize = 10;


            initOptions.enableColumnMenus = initOptions.enableColumnMenus || false;

            initOptions.enableRowHeaderSelection = initOptions.enableRowHeaderSelection || false;
            initOptions.enableFullRowSelection = initOptions.enableFullRowSelection || true;

            initOptions.columnDefs.forEach((column) => {
                //column.headerCellFilter = 'translate';
                column.enableSorting = column.enableSorting || false;
                column.enableFiltering = column.enableFiltering || true;
            });

            return initOptions;
        };

        return gridOptions;
}

gridDecorator.$inject = ["$delegate", "uiGridConstants"];

export default gridDecorator;