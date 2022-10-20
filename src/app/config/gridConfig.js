import 'angular-ui-grid/ui-grid.js';

import angular from 'angular';
import gridDecorator from '../common/decorators/gridOptions'

export default class GridConfig {
    static getModules() {
        return [
            "ui.grid",
            "ui.grid.pagination",
            "ui.grid.autoResize",
            "ui.grid.selection"
        ];
    }

    static config() {
        const app = angular.module("omt");

        app.config(function ($provide) {
            $provide.decorator('GridOptions', gridDecorator);
        });
    }
}