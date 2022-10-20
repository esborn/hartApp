import "../assets/polyfills/_index";
import "../assets/ieHelpers/ieVersionWarningHelper";

import "dropzone/dist/basic.css";
import "dropzone/dist/dropzone.css";

import "angular-material/angular-material.css";

import angular from "angular";
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularMaterial from 'angular-material';
import angularSanitize from 'angular-sanitize';
import angularMessages from 'angular-messages';

import grid from "./config/gridConfig"

import components from "./bootstrap/componentsBootstrap";
import directives from "./bootstrap/directivesBootstrap";
import services from "./bootstrap/servicesBootstrap";
import filters from "./bootstrap/filtersBootstrap";

import dateTimeConfig from "./config/dateTimeConfig";
import routerConfig from "./config/routerConfig";
import appConfig from "./config/appConfig";
import interceptorConfig from "./config/interceptorConfig";
import featuresConfig from "./config/featuresConfig";
import errorMessagesConfig from "./config/errorMessagesConfig";

import jQueryConfig from "./config/jQueryConfig";

import angularApp from "./config/bootstrap";

const getModules = () => {
	const angularModules = [
		angularMaterial,
		angularAnimate,
		angularAria,
		angularSanitize,
		angularMessages
	];

	return angularModules
				.concat(routerConfig.getModules())
				.concat(grid.getModules())
                .concat(featuresConfig.getModules())
};

angular.module("omt", getModules());

jQueryConfig.config();

errorMessagesConfig.config();
interceptorConfig.config();
grid.config();
dateTimeConfig.config();
routerConfig.config();
appConfig.config();

filters.register();
services.register();
directives.register();
components.register();

angularApp.bootstrap();
