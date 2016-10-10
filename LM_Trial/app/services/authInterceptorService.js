'use strict';
app.factory('authInterceptorService', ['$q', '$location','$window', function ($q, $location,  $window) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = JSON.parse(sessionStorage.getItem('authorizationData'));
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _responseError = function (rejection) {
        //if (sessionStorage.getItem('isLogin') == 'true') {
        //    rejection.status = 200;
        //}
        if (rejection.status === 401) {
            $window.location.href = "login.html";
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);