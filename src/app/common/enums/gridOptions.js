export default class GridOptions {
    static get options() {
        return {
            responseCodeOptions: {
                enableSorting: true,
                enableFiltering: true,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                columnDefs: [
                    { field: 'id', visible: false },
                    { displayName: 'Response Code', field: 'Code',
                    cellTemplate: '<md-button class="md-primary" ng-click="grid.appScope.openResponse(row.entity.Id)">{{COL_FIELD}}</md-button>'
                },
                { displayName: 'Response Status', field: 'ResponseStatus', enableFiltering: true, enableSorting: true },                                 
                    { displayName: 'Description', field: 'ResponseDescription', enableSorting: false, enableFiltering: false },
                    { displayName: 'Start Date', field: 'StartDate', enableSorting: true, enableFiltering: false,  cellFilter: "dateFormat" },
                    { displayName: 'Country', field: 'Country', enableSorting: true },
                    { displayName: 'Region', field: 'Region', enableFiltering: true, enableSorting: true },
                    { displayName: 'Category', field: 'ResponseCategory', enableFiltering: true, enableSorting: true },
                    { displayName: 'SoD Category', field: 'SoDCategory', enableFiltering: true, enableSorting: true },
                    { displayName: 'SoD Days Remaining', field: 'getSoDRemainingDays()', enableFiltering: true, enableSorting: true, type: 'number', cellFilter: 'number: 0' }
                ],                
                showExpandButtonAlways: false,
                hasCustomFilters: true
            },
            responseCodeAdminOptions: {
                enableSorting: true,
                enableFiltering: true,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                columnDefs: [
                    { field: 'id', visible: false },
                    { displayName: 'Response Code', field: 'Code',
                    cellTemplate: '<md-button class="md-primary" ng-click="grid.appScope.openResponse(row.entity.Id)">{{COL_FIELD}}</md-button>'
                },
                { displayName: 'Response Status', field: 'ResponseStatus', enableFiltering: true, enableSorting: true },                                 
                    { displayName: 'Description', field: 'ResponseDescription', enableSorting: false, enableFiltering: false },
                    { displayName: 'Start Date', field: 'StartDate', enableSorting: true, enableFiltering: false,  cellFilter: "dateFormat" },
                    { displayName: 'Country', field: 'Country', enableSorting: true },
                    { displayName: 'Region', field: 'Region', enableFiltering: true, enableSorting: true },
                    { displayName: 'Category', field: 'ResponseCategory', enableFiltering: true, enableSorting: true },
                    { displayName: 'SoD Category', field: 'SoDCategory', enableFiltering: true, enableSorting: true },
                    { displayName: 'SoD Days Remaining', field: 'getSoDRemainingDays()', enableFiltering: true, enableSorting: true, type: 'number', cellFilter: 'number: 0' },
                    { displayName: 'Edit', field: 'Edit', cellTemplate: '<md-button class="md-primary" ng-click="grid.appScope.editResponseCode(row.entity.Id)">Edit</md-button>' }                 
                ],                
                showExpandButtonAlways: false,
                hasCustomFilters: true
            },

            reportOptions: {
                enableSorting: true,
                enableFiltering: true,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                columnDefs: [
                    { field: 'id', visible: false },
                    { displayName: 'Status', field: 'ReportStatus',
                   cellTemplate: '<md-button class="md-primary" ng-click="grid.appScope.openReport(row.entity.ResponseId, row.entity.Id)">{{COL_FIELD}}</md-button>'},                    
                    { displayName: 'Sitrep number', field: 'SitrepNumber', enableSorting: true,  enableFiltering: true},                    
                    { displayName: 'Sitrep Date', field: 'SitrepDate', enableSorting: true, cellFilter: "dateFormat" },
                    { displayName: 'Next Sitrep Date', field: 'NextSitrepDate', cellFilter: "dateFormat" },
                    { displayName: 'Last modified by', field: 'LastModifiedUserName', enableFiltering: true, enableSorting: true }                                                             
                ],                
                showExpandButtonAlways: false,
                hasCustomFilters: true
            }
        }
    }
}