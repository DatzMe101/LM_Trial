'use strict';
var rootUrl = sessionStorage.getItem('rootUrl');
app.factory('contactService', ['$http', function ($http) {
    var contactServiceFactory = {};

    var getContactList = function (params) {
        var url = '/contacts/FamilyListGet' + params;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };
    contactServiceFactory.getContactList = getContactList;

    return contactServiceFactory;
}]);