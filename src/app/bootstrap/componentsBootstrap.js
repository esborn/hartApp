//main app component
import appMainComponent from "../components/root/root";

//page components
import emptyPage from "../components/pages/emptyPage/emptyPage";
import home from "../components/pages/home/home";
import reports from "../components/pages/reports/reports";
import response from "../components/pages/response/response";
import addReport from "../components/pages/addReport/addReport";
import viewReport from "../components/pages/viewReport/viewReport";
import regions from "../components/pages/administrator/regions/regions";
import users from "../components/pages/administrator/users/users";
import countries from "../components/pages/administrator/countries/countries";
import accessDenied from "../components/pages/accessDenied/accessDenied";
import responseCodesList from "../components/pages/administrator/responseCodesList/responseCodesList";
import reportsList from "../components/pages/administrator/reportsList/reportsList";

//layout components
import menuLink from "../components/layout/menu/menuLink/menuLink";
import menuToggle from "../components/layout/menu/menuToggle/menuToggle";
import toolbar from "../components/layout/toolbar/toolbar";
import sidenav from "../components/layout/sidenav/sidenav";
import footer from "../components/layout/footer/footer";
import notification from "../components/layout/toolbar/notification/notification";
import loading from "../components/common/loading/loading";
import logo from "../components/layout/logo/logo";
import scrollToTop from "../components/layout/scrollToTop/scrollToTop";

import grid from "../components/common/grid/grid";
import gridDateFilter from "../components/common/gridFilters/date/dateFilter";
import accordion from "../components/common/accordion/accordion";
import toggleAccordionSection from "../components/common/accordion/toggleSection/toggleSection";
import languagePicker from "../components/common/languagePicker/languagePicker";
import list from "../components/common/list/list";
import fileUpload from "../components/common/fileUpload/fileUpload";
import attachments from "../components/common/attachments/attachments";

import angular from "angular";

export default class Bootstrap {
    static register() {
        const app = angular.module("omt");

        app.component("app", appMainComponent);

        //page components
        app.component("emptyPage", emptyPage);
        app.component("home", home);
        app.component("reports", reports);
        app.component("response", response);
        app.component("addReport", addReport);
        app.component("viewReport", viewReport);        
        app.component("regions", regions);
        app.component("users", users);
        app.component("countries", countries);
        app.component("notification", notification);
        app.component("accessDenied", accessDenied);
        app.component("responseCodesList", responseCodesList);
        app.component("reportsList", reportsList);
        

        //layout components
        app.component("menuLink", menuLink);
        app.component("menuToggle", menuToggle);
        app.component("toolbar", toolbar);
        app.component("sidenav", sidenav);
        app.component("footer", footer);
        app.component("loading", loading);
        app.component("logo", logo);
        app.component("scrollToTop", scrollToTop);

        app.component("grid", grid);
        app.component("gridDateFilter", gridDateFilter);
        app.component("accordion", accordion);
        app.component("toggleAccordionSection", toggleAccordionSection);
        app.component("languagePicker", languagePicker);
        app.component("list", list);
        app.component("fileUpload", fileUpload);
        app.component("attachments", attachments);
    }
}