'use strict';

app.controller('contactController', ['$scope', 'contactService', 'sharedService', function ($scope, contactService, sharedService) {
    //Declaration
    $scope.contactList = [];
    $scope.totalContact = 0;
    $scope.order = 'FamilyFullName';
    $scope.reversed = false;
    $scope.sortIcon = 'fa fa-sort-asc';
    $scope.currentLetter = 'A';

    //Function Calls
    getContactList();
    //getTempData();

    //Scope Function
    $scope.SetOrder = function (order) {
        if ($scope.contactList.length != 0) {
            if ($scope.order == order) {
                $scope.reversed = !$scope.reversed;
                $scope.sortIcon = $scope.reversed ? 'fa fa-sort-desc' : 'fa fa-sort-asc';
            }
            else {
                $scope.order = order;
                $scope.reversed = true;
                $scope.sortIcon = 'fa fa-sort-desc';
            }
        }
    };

    $scope.setCurrentLetter = function (letter) {
        $scope.currentLetter = letter;
        getContactList();
    };

    $scope.gotoDetail = function (familyId,fullName) {
        var url = '/contact/detail/' + familyId;
        sharedService.navigateTo(url);
    };
    //Other Function
    function getContactList() {
        var params = '?startWith=' + $scope.currentLetter;
        contactService.getContactList(params).then(function (response) {
            $scope.contactList = response.data.FamilyList;
            $scope.totalContact = response.data.TotalNumber;
        }, function (error) {
            //error message if needed
        });
    };


    //Temporary Value
    function getTempData() {
        var tempData = {
            "TotalNumber": 10,
            "FamilyList": [
            { "FamilyID": "0000000", "FamilyFullName": "lastname (firstname1 & firstname2)", "City": "CHRISTCHURCH", "Contact": " 0211212121, 0211212121", "Adviser": "lastname (firstname)", "ClientType": "" },
            { "FamilyID": "0000001", "FamilyFullName": "test2 (firstname1 & firstname2)", "City": "CHRISTCHURCH", "Contact": " 0211212121, 0211212121", "Adviser": "lastname (firstname)", "ClientType": "" }
            ]
        };
        $scope.contactList = tempData.FamilyList;
        $scope.totalContact = tempData.TotalNumber;
    };

    $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    


}]);