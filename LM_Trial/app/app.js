'use strict';
var app = angular.module('LM_Trial_App', ['ngRoute']);
sessionStorage.setItem('rootUrl', 'https://testapi.nzfsg.co.nz');

//Angular Routing
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/features/dashboard/dashboard.html'
    });
    $routeProvider.when('/contact', {
        controller : 'contactController',
        templateUrl: 'app/features/contact/contact.html'
    });
    $routeProvider.when('/contact/detail/:familyId', {
        controller : 'contactDetailController',
        templateUrl:'app/features/contact_detail/contact_detail.html'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);

//Push interceptor every request.
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);