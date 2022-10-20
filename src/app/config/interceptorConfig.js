export default class InterceptorConfig {
    static config(){
        const app = angular.module("omt");
        
        app.config(($httpProvider) => {
            $httpProvider.interceptors.push("appHttpInterceptor");
        });
    }
}