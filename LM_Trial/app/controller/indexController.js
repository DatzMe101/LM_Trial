'use strict';
app.controller('indexController', ['$scope', 'contactService', 'sharedService', function ($scope, contactService, sharedService) {
    //Declarations

    $scope.activeTab = sessionStorage.getItem('activeTab') || 'dashboard';
    
    //Scope Functions
    $scope.setActiveTab = function (activeTab) {
        $scope.activeTab = activeTab;
        sessionStorage.setItem('activeTab', activeTab)
    };

    $scope.navigateTo = function (url) {
        sharedService.navigateTo(url);
    };
    //Other Functions


    //Temporary function to inforce interceptor
    //to execute for authentication. This should be
    //something like User Information function but for
    //this sample this is I used.
    contactService.getContactList('').then(function (response) {
    }, function (error) {
    });

}]);