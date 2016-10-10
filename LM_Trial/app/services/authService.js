'use strict';
var rootUrl = sessionStorage.getItem('rootUrl');
app.factory('authService', ['$http', '$q', '$window', function ($http, $q, $window) {
    var authServiceFactory = {};

    var login = function (loginData) {
        var data = "username=" + loginData.username + "&password=" + loginData.password;
        var url = '/login';

        var deferred = $q.defer();

        return $http.post(rootUrl + url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            sessionStorage.setItem('authorizationData', JSON.stringify({
                token: response
            }));
            deferred.resolve(response);
        }).error(function (err, status) {
            delete sessionStorage.removeItem('authorizationData');
            deferred.reject(err);
        });
    };

    authServiceFactory.login = login;

    return authServiceFactory;
}]);