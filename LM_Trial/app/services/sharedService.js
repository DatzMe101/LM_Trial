'use strict';
app.factory('sharedService', ['$http', '$location', function ($http, $location) {
    var sharedServiceFactory = {};

    //This service is common routing function
    //The main reason for this is to save the previous URL navigated to get the returnUrl
    var navigateTo = function (url) {
        $location.path(url);
        sessionStorage.setItem('returnUrl', url);
    };

    sharedServiceFactory.navigateTo = navigateTo;
    
    return sharedServiceFactory;
}]);