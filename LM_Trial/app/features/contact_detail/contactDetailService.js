'use strict';
var rootUrl = sessionStorage.getItem('rootUrl');
app.factory('contactDetailService', ['$http', function ($http) {
    var contactDetailServiceFactory = {};

    var getFamilyInformation = function (familyId) {
        var url = '/contacts/clientInformGet?FamilyID=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };

    var getFamilyAddress = function (familyId) {
        var url = '/contacts/FamilyAddressInformGet?FamilyId=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };
    var getLoanList = function (familyId) {
        var url = '/contacts/LoanList?familyId=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };

    var getTagList = function (familyId) {
        var url = '/contacts/taggedlist?familyId=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };

    var getNoteList = function (familyId) {
        var url = '/contacts/NoteList?familyID=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };

    var getContactFamilyInfo = function (familyId) {
        var url = '/contacts/ContactFamilyInfoGet?familyID=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };

    var getRelationship = function (familyId) {
        var url = '/contacts/RelationshipGet?familyID=' + familyId;
        return $http.get(rootUrl + url).success(function (response) {
            return response;
        }).error(function (err, status) {
            return status;
        });
    };
    var postContacts = function (data, person) {
        var url = '/contacts/contactset?person=' + person;
        return $http.post(rootUrl + url,data ).success(function (response) {
            return response;
        }).error(function (err, status) {
            return err;
        });

    };
    contactDetailServiceFactory.getFamilyInformation = getFamilyInformation;
    contactDetailServiceFactory.getFamilyAddress = getFamilyAddress;
    contactDetailServiceFactory.getLoanList = getLoanList;
    contactDetailServiceFactory.getTagList = getTagList;
    contactDetailServiceFactory.getNoteList = getNoteList;
    contactDetailServiceFactory.getContactFamilyInfo = getContactFamilyInfo;
    contactDetailServiceFactory.getRelationship = getRelationship;
    contactDetailServiceFactory.postContacts = postContacts;

    return contactDetailServiceFactory;
}]);