import envConfig from "../../config/envConfig.js";
import interceptorConfig from "./appHttpInterceptorConfig.json";
import AppHelpers from "../helpers/AppHelpers";
import StringHelpers from "../helpers/StringHelpers";

let self;

export default class AppHttpInterceptor {
    constructor($q, $injector) {
        self = this;
        self.$q = $q;
        self.$injector = $injector;
    }

    request(config) {
        config.headers = config.headers || {};

        if (!config.acceptHeaderSet) {
            config.headers['Accept'] = 'application/json; odata=verbose';            
        }

        if (config.setContentType ||
            config.setContentType === undefined) {
            config.headers['Content-Type'] = 'application/json; odata=verbose';
        }
        
        if (config.setSiteUrl || 
            config.url.indexOf(interceptorConfig.apiRequest) > -1) {
            config.url = envConfig.site_url +  config.url;
        } else {
            return config;
        }
        
        if (!config.requiresDigest) {
            return config;
        }

        let deferred = self.$q.defer();
        let http = self.$injector.get("$http");
        http.post(interceptorConfig.renewRequestDigest).then((result) => {           
            config.headers['X-RequestDigest'] = result.GetContextWebInformation.FormDigestValue;
            
            deferred.resolve(config);
        });
        
        return deferred.promise;
    }

    response(value) {
        if (value.config && value.config.url && StringHelpers.includes(value.config.url, "/items")) {
            if (!self.$injector) return;

            let parsedValue = AppHelpers.transformResponse(value);
            if (Array.isArray(parsedValue) && parsedValue.length >= 500) {
                const toastService = self.$injector.get("toastService");
                toastService.showToast("ITEMCOUNT_WARNING");
            }
        }

        const newResponse = AppHelpers.transformResponse(value);

        return AppHelpers.isEmptyData(value) ? self.$q.reject() : newResponse || self.$q.when(newResponse);
    }

    responseError(rejection) {
        return self.$q.reject(rejection);
    }
}

AppHttpInterceptor.$inject = ["$q", "$injector"];