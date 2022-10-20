import angular from "angular";
import '@angular/router/angular1/angular_1_router.js';

export default class StateConfig {
    static config() {
        const app = angular.module("omt");

        app.value('$routerRootComponent', 'app');
    }

    static getModules() {
        return ['ngComponentRouter'];
    }

    static getPaths() {
        return [{
                path: '/addReport/:id/:reportId',
                name: 'AddReport',
                component: 'addReport'
            },
            {
                path: '/response/:id',
                name: 'EditResponseCode',
                component: 'response'
            },
            {
                path: '/addReport/:id',
                name: 'CreateReport',
                component: 'addReport'
            },
            {
                path: '/response',
                name: 'Response',
                component: 'response'
            },
            {
                path: '/access-denied',
                name: 'AccessDenied',
                component: 'accessDenied'
            },
            {
                path: "/home",
                name: "Home",
                component: 'home'
            },
            {
                path: "/reports",
                name: "Reports",
                component: 'reports'
            },
            {
                path: "/reports/:id",
                name: "Reports",
                component: 'reports'
            },
            {
                path: '/admin-regions',
                name: 'Regions',
                component: 'regions'
            },
            {
                path: '/admin-countries',
                name: 'Countries',
                component: 'countries'
            },
            {
                path: '/admin-reportsList',
                name: 'ReportsList',
                component: 'reportsList'
            },
            {
                path: '/admin-responseCodesList',
                name: 'ResponseCodesList',
                component: 'responseCodesList'
            },
            {
                path: '/admin-users',
                name: 'Users',
                component: 'users'
            },
            {
                path: '/*otherwise',
                redirectTo: ['Home']
            }
        ];
    }
}