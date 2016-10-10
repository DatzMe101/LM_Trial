'use strict';
app.controller('contactDetailController', ['$scope', 'sharedService', 'contactDetailService', '$routeParams', function ($scope, sharedService, contactDetailService, $routeParams) {

    //===================== General in Contact Detail Controller ==============================
    var familyId = $routeParams.familyId;
    $scope.familyId = $routeParams.familyId;
    $scope.currentTab = 'Summary';
    $scope.familyInfo = {};
    $scope.familyList = {};

    initializeLoad();

    function initializeLoad() {
        getFamilyInformation();
        getFamilyAddress();
        getLoanList();
        getTagList();
        getNoteList();
    };

    
    //===================== Start of Client Table of Summary Tab ==============================
    //Declaration
    
    $scope.adultsList = [];
    $scope.childList = [];
    $scope.emailList = [];
    $scope.phoneList = [];

    //Funcation calls
     


    //Scope Functions
    $scope.setCurrentTab = function (tab) {
        $scope.currentTab = tab;
    };
    $scope.gotoDetail = function (url) {
        sharedService.navigateTo(url);
    };
    
    //Other function
    function getFamilyInformation() {
        contactDetailService.getFamilyInformation(familyId).then(function (response) {
            $scope.familyInfo = response.data[0];
            $scope.familyList = response.data;
            getAdults();
            getChildren();
            getEmails();
            getPhone();
        }, function (error) {
            //error message if needed
        });
    };
    function getFamilyInformationOnly() {
        contactDetailService.getFamilyInformation(familyId).then(function (response) {
            $scope.familyList = response.data;
        }, function (error) {
            //error message if needed
        });
    };
    function getFamilyAddress() {
        contactDetailService.getFamilyAddress(familyId).then(function (response) {
            $scope.addresses = response.data[0].formatted_address;
        }, function (error) {
            //error message if needed
        });
    };

    function getAdults() {
        var data = $scope.familyList;
        if (data) {
            $scope.adultsList = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Role == 'Adult') {
                    $scope.adultsList.push(data[i].Title + '. ' + data[i].FirstName + ' ' + data[i].LastName)
                }
            }
        }
    };

    function getChildren() {
        var data = $scope.familyList;
        if (data) {
            $scope.childList = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Role == 'Child') {
                    $scope.childList.push(data[i].Title + '. ' + data[i].FirstName + ' ' + data[i].LastName)
                }
            }
        }
    };

    function getEmails() {
        var data = $scope.familyList;
        if (data) {
            $scope.emailList = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Role == 'Adult') {
                    var temp = {
                        Name: data[i].FirstName,
                        Email: data[i].Email
                    };
                    $scope.emailList.push(temp);
                }
            }
        }
    };

    function getPhone() {
        var data = $scope.familyList;
        if (data) {
            $scope.phoneList = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Role == 'Adult') {
                    var temp = {
                        Name: data[i].FirstName,
                        Phone: data[i].Phone
                    };
                    $scope.phoneList.push(temp);
                }
            }
        }
    };
    
    //===================== End of Client Table of Summary Tab =======================
    




    
    //===================== Start of Loan Table of Summary Tab ==============================
    
    $scope.loanList = [];
    
    //Functions
    function getLoanList() {
        contactDetailService.getLoanList(familyId).then(function (response) {
            $scope.loanList = response.data;
        }, function (error) {
            //error message if needed
        })
    };
    //===================== End of Loan Table of Summary Tab ==============================


    //===================== Start of Tag of Summary Tab ==============================
    $scope.tagList = [];

    //Functions
    function getTagList() {
        contactDetailService.getTagList(familyId).then(function (response) {
            $scope.tagList = response.data;
        }, function (error) {
            //error message if needed
        });
    };
    //===================== End of Tag of Summary Tab ==============================


    //===================== Start of Notes of Summary Tab ==============================
    $scope.noteList = [];
    function getNoteList() {
        contactDetailService.getNoteList(familyId).then(function (response) {
            $scope.noteList = response.data;
        }, function (error) {
            //error message if needed
        });
    };
    //===================== End of Notes of Summary Tab ==============================


    //===================== Start of Client Tab ======================================
    $scope.chk = {};
    $scope.chkMarketing = {};
    $scope.chkNewsletter = {};
    $scope.address = {};
    $scope.chk.value = true;
    $scope.chkMarketing.value = true;
    $scope.chkNewsletter.value = true;
    $scope.clientTypeList = [];

    getContactFamilyInfo();

    $scope.setCheckBox = function () {
        $scope.chk.value = !$scope.chk.value;
        if ($scope.chk.value) {
            $scope.address.mailing = $scope.address.home;
        }
        else {
            $scope.address.mailing = '';
        }
    };
    $scope.setMarketing = function () {
        $scope.chkMarketing.value = !$scope.chkMarketing.value;
    };
    $scope.chkNewsLetter = function () {
        $scope.chkNewsletter.value = !$scope.chkNewsletter.value;
    };
    $scope.setChanges = function () {
        if ($scope.chk.value) {
            $scope.address.mailing = $scope.address.home;
        }
    };
    getContactFamilyInfo();

    function getContactFamilyInfo() {
        contactDetailService.getContactFamilyInfo(familyId).then(function (response) {
            $scope.contactFamilyInfoList = response.data;
            if (response.data) {
                initializeContact(response.data);
            }
        }, function (error) { })
    };

    function initializeContact(data) {
        $scope.chk.value = data.isMailingAddress;
        $scope.chkMarketing.value = data.isMarketing;
        $scope.chkNewsletter.value = data.isNewsletter;
        $scope.clientTypeList = data.ClientTypes;
        if (data.isMailingAddress) {
            $scope.address.home = data.addresses[0].formatted_address;
            $scope.address.mailing = data.addresses[0].formatted_address;
        }
        $scope.email = data.MainEmail;
        $scope.referenceCode = data.ReferenceCode;
    };

    $scope.relationshipList = [];
    getRelationship();
    function getRelationship() {
        contactDetailService.getRelationship(familyId).then(function (response) {
            $scope.relationshipList = response.data;
        }, function (error) { })
    };

    //===================== End of Client Tab ==============================

    //===================== Start of Add Client Modal ======================================
    $scope.client = {};
    $scope.clientPhone = {};
    $scope.client.familyId = 0;
    $scope.client.gender = 'Male';
    $scope.client.DOBReminder = true;
    $scope.client.deceased = false;
    $scope.client.smokerStatus = false;
    $scope.client.Employment = [];
    $scope.timePeriod = 'AM';
    
    
    $scope.setClientTitle = function (value) {
        $scope.client.title = value;
    };
    $scope.setClientRole = function (value) {
        $scope.client.role = value;
    };
    $scope.setGender = function (value) {
        $scope.client.gender = value;
    };
    $scope.setDOBReminder = function (value) {
        $scope.client.DOBReminder = !$scope.client.DOBReminder;
    };
    $scope.setDeceased = function (value) {
        $scope.client.deceased = !$scope.client.deceased;
    };
    $scope.setTimePeriod = function () {
        if ($scope.timePeriod == 'AM') {
            $scope.timePeriod = 'PM';
        } else {
            $scope.timePeriod = 'AM';
        }
    };
    $scope.setSmoker = function (value) {
        $scope.client.smokerStatus = value;
    };
    $scope.setClientClass = function (value) {
        $scope.clientClassValue = value;
        $scope.clientClass = 'Class ' + value;
    };

    $scope.saveClient = function () {
        //var clientData = [];
        //if ($scope.clientTimeToCall) {
        //    $scope.client.BestTimeToCall = $scope.clientTimeToCall + ' ' + $scope.timePeriod;
        //}
        //if ($scope.client.dob) {
        //    $scope.client.age = calculateAge($scope.client.dob);
        //}
        //$scope.client.employment = getEmployments();
        //$scope.client.phone = getPhones();
        //$scope.client.email = getEmails();
        //clientData.push($scope.client);
        var personData = [
          {
              "FamilyId": "",
              "PersonId": "",
              "Role": $scope.client.role || '',
              "LastName": $scope.client.lastName || '',
              "FirstName": $scope.client.firstName || '',
              "MiddleName": $scope.client.middleName || '',
              "PreferredName": $scope.client.preferredName || '',
              "Title": $scope.client.title || '',
              "Gender": $scope.client.gender || '',
              "MaritalStatus": "",
              "DOB": $scope.client.dob || '',
              "Age": calculateAge($scope.client.dob) || '',
              "CountryOfBirth": "",
              "Employment": [
                {
                    "CurrentPrevious": "",
                    "Occupation": $scope.clientOccupation || '',
                    "OccupationClass": $scope.clientClassValue || 0,
                    "Employer": "",
                    "BusinessType": "",
                    "Income": {
                        "IncomeId": "",
                        "FrequencyID": "",
                        "Frequency": "",
                        "GrossNet": "",
                        "NetValue": 0,
                        "IsMainSource": true,
                        "LinkToAsset": {
                            "AssetId": "",
                            "Address": {
                                "street_address": "",
                                "route": "",
                                "intersection": "",
                                "political": "",
                                "country": "",
                                "administrative_area_level_1": "",
                                "administrative_area_level_2": "",
                                "administrative_area_level_3": "",
                                "administrative_area_level_4": "",
                                "administrative_area_level_5": "",
                                "colloquial_area": "",
                                "locality": "",
                                "ward": "",
                                "sublocality": "",
                                "sublocality_level_1": "",
                                "sublocality_level_2": "",
                                "sublocality_level_3": "",
                                "sublocality_level_4": "",
                                "sublocality_level_5": "",
                                "neighborhood": "",
                                "premise": "",
                                "subpremise": "",
                                "postal_code": "",
                                "natural_feature": "",
                                "airport": "",
                                "park": "",
                                "point_of_interest": "",
                                "floor": "",
                                "establishment": "",
                                "parking": "",
                                "post_box": "",
                                "postal_town": "",
                                "room": "",
                                "street_number": "",
                                "bus_station": "",
                                "train_station": "",
                                "transit_station": "",
                                "latitude": 0,
                                "longitude": 0,
                                "formatted_address": "",
                                "geoCoded": true,
                                "short_name": "",
                                "countryCode": "",
                                "errorMessage": "",
                                "AddressID": "",
                                "Type": "",
                                "StreetLine1": "",
                                "StreetLine2": "",
                                "City": "",
                                "Postcode": "",
                                "YearsInAddress": 0,
                                "MonthsInAddress": 0
                            },
                            "InsuranceCoverAmount": "",
                            "InsuranceProvider": "",
                            "CurrentOwnership": "",
                            "DevelopmentStatus": "",
                            "Zoning": "",
                            "Tenure": "",
                            "Intention": "",
                            "Valuation": [
                              {
                                  "PropertyValuationId": "",
                                  "Type": "",
                                  "Value": 0,
                                  "IsDefault": true
                              }
                            ],
                            "OwnerFamily": "",
                            "Owners": [
                              {
                                  "Phone": [
                                    {
                                        "Type": "",
                                        "Number": ""
                                    }
                                  ],
                                  "Address": [
                                    {
                                        "street_address": "",
                                        "route": "",
                                        "intersection": "",
                                        "political": "",
                                        "country": "",
                                        "administrative_area_level_1": "",
                                        "administrative_area_level_2": "",
                                        "administrative_area_level_3": "",
                                        "administrative_area_level_4": "",
                                        "administrative_area_level_5": "",
                                        "colloquial_area": "",
                                        "locality": "",
                                        "ward": "",
                                        "sublocality": "",
                                        "sublocality_level_1": "",
                                        "sublocality_level_2": "",
                                        "sublocality_level_3": "",
                                        "sublocality_level_4": "",
                                        "sublocality_level_5": "",
                                        "neighborhood": "",
                                        "premise": "",
                                        "subpremise": "",
                                        "postal_code": "",
                                        "natural_feature": "",
                                        "airport": "",
                                        "park": "",
                                        "point_of_interest": "",
                                        "floor": "",
                                        "establishment": "",
                                        "parking": "",
                                        "post_box": "",
                                        "postal_town": "",
                                        "room": "",
                                        "street_number": "",
                                        "bus_station": "",
                                        "train_station": "",
                                        "transit_station": "",
                                        "latitude": 0,
                                        "longitude": 0,
                                        "formatted_address": "",
                                        "geoCoded": true,
                                        "short_name": "",
                                        "countryCode": "",
                                        "errorMessage": "",
                                        "AddressID": "",
                                        "Type": "",
                                        "StreetLine1": "",
                                        "StreetLine2": "",
                                        "City": "",
                                        "Postcode": "",
                                        "YearsInAddress": 0,
                                        "MonthsInAddress": 0
                                    }
                                  ],
                                  "Email": [
                                    {
                                        "Type": "",
                                        "EmailAddress": ""
                                    }
                                  ],
                                  "Notes": "",
                                  "PersonId": "",
                                  "OrganisationId": ""
                              }
                            ],
                            "Type": "",
                            "PropertyType": "",
                            "TypeOther": "",
                            "Description": "",
                            "Value": 0,
                            "Borrowers": [
                              {
                                  "BorrowerID": 0,
                                  "FirstName": "",
                                  "LastName": "",
                                  "IsInclude": true,
                                  "IsEntity": true
                              }
                            ],
                            "OtherInformation": "",
                            "FinancialID": ""
                        },
                        "AssetAddress": {
                            "street_address": "",
                            "route": "",
                            "intersection": "",
                            "political": "",
                            "country": "",
                            "administrative_area_level_1": "",
                            "administrative_area_level_2": "",
                            "administrative_area_level_3": "",
                            "administrative_area_level_4": "",
                            "administrative_area_level_5": "",
                            "colloquial_area": "",
                            "locality": "",
                            "ward": "",
                            "sublocality": "",
                            "sublocality_level_1": "",
                            "sublocality_level_2": "",
                            "sublocality_level_3": "",
                            "sublocality_level_4": "",
                            "sublocality_level_5": "",
                            "neighborhood": "",
                            "premise": "",
                            "subpremise": "",
                            "postal_code": "",
                            "natural_feature": "",
                            "airport": "",
                            "park": "",
                            "point_of_interest": "",
                            "floor": "",
                            "establishment": "",
                            "parking": "",
                            "post_box": "",
                            "postal_town": "",
                            "room": "",
                            "street_number": "",
                            "bus_station": "",
                            "train_station": "",
                            "transit_station": "",
                            "latitude": 0,
                            "longitude": 0,
                            "formatted_address": "",
                            "geoCoded": true,
                            "short_name": "",
                            "countryCode": "",
                            "errorMessage": "",
                            "AddressID": "",
                            "Type": "",
                            "StreetLine1": "",
                            "StreetLine2": "",
                            "City": "",
                            "Postcode": "",
                            "YearsInAddress": 0,
                            "MonthsInAddress": 0
                        },
                        "AssetIsExisting": true,
                        "IsGross": true,
                        "IsExisting": true,
                        "OwnerFamily": "",
                        "Owners": [
                          {
                              "Phone": [
                                {
                                    "Type": "",
                                    "Number": ""
                                }
                              ],
                              "Address": [
                                {
                                    "street_address": "",
                                    "route": "",
                                    "intersection": "",
                                    "political": "",
                                    "country": "",
                                    "administrative_area_level_1": "",
                                    "administrative_area_level_2": "",
                                    "administrative_area_level_3": "",
                                    "administrative_area_level_4": "",
                                    "administrative_area_level_5": "",
                                    "colloquial_area": "",
                                    "locality": "",
                                    "ward": "",
                                    "sublocality": "",
                                    "sublocality_level_1": "",
                                    "sublocality_level_2": "",
                                    "sublocality_level_3": "",
                                    "sublocality_level_4": "",
                                    "sublocality_level_5": "",
                                    "neighborhood": "",
                                    "premise": "",
                                    "subpremise": "",
                                    "postal_code": "",
                                    "natural_feature": "",
                                    "airport": "",
                                    "park": "",
                                    "point_of_interest": "",
                                    "floor": "",
                                    "establishment": "",
                                    "parking": "",
                                    "post_box": "",
                                    "postal_town": "",
                                    "room": "",
                                    "street_number": "",
                                    "bus_station": "",
                                    "train_station": "",
                                    "transit_station": "",
                                    "latitude": 0,
                                    "longitude": 0,
                                    "formatted_address": "",
                                    "geoCoded": true,
                                    "short_name": "",
                                    "countryCode": "",
                                    "errorMessage": "",
                                    "AddressID": "",
                                    "Type": "",
                                    "StreetLine1": "",
                                    "StreetLine2": "",
                                    "City": "",
                                    "Postcode": "",
                                    "YearsInAddress": 0,
                                    "MonthsInAddress": 0
                                }
                              ],
                              "Email": [
                                {
                                    "Type": "",
                                    "EmailAddress": ""
                                }
                              ],
                              "Notes": "",
                              "PersonId": "",
                              "OrganisationId": ""
                          }
                        ],
                        "Type": "",
                        "PropertyType": "",
                        "TypeOther": "",
                        "Description": "",
                        "Value": 0,
                        "Borrowers": [
                          {
                              "BorrowerID": 0,
                              "FirstName": "",
                              "LastName": "",
                              "IsInclude": true,
                              "IsEntity": true
                          }
                        ],
                        "OtherInformation": "",
                        "FinancialID": ""
                    },
                    "YearsEmployment": 0,
                    "MonthsEmployment": 0,
                    "IncomeDetails": ""
                }
              ],
              "SmokerStatus": $scope.client.smokerStatus,
              "LivingStatus": "",
              "Deceased": $scope.client.deceased,
              "NZResident": true,
              "DOBReminder": $scope.client.DOBReminder,
              "BestTimeToCall": $scope.clientTimeToCall + ' ' + $scope.timePeriod,
              "Phone": getPhones(),
              "Address": [
                {
                    "street_address": "",
                    "route": "",
                    "intersection": "",
                    "political": "",
                    "country": "",
                    "administrative_area_level_1": "",
                    "administrative_area_level_2": "",
                    "administrative_area_level_3": "",
                    "administrative_area_level_4": "",
                    "administrative_area_level_5": "",
                    "colloquial_area": "",
                    "locality": "",
                    "ward": "",
                    "sublocality": "",
                    "sublocality_level_1": "",
                    "sublocality_level_2": "",
                    "sublocality_level_3": "",
                    "sublocality_level_4": "",
                    "sublocality_level_5": "",
                    "neighborhood": "",
                    "premise": "",
                    "subpremise": "",
                    "postal_code": "",
                    "natural_feature": "",
                    "airport": "",
                    "park": "",
                    "point_of_interest": "",
                    "floor": "",
                    "establishment": "",
                    "parking": "",
                    "post_box": "",
                    "postal_town": "",
                    "room": "",
                    "street_number": "",
                    "bus_station": "",
                    "train_station": "",
                    "transit_station": "",
                    "latitude": 0,
                    "longitude": 0,
                    "formatted_address": "",
                    "geoCoded": true,
                    "short_name": "",
                    "countryCode": "",
                    "errorMessage": "",
                    "AddressID": "",
                    "Type": "",
                    "StreetLine1": "",
                    "StreetLine2": "",
                    "City": "",
                    "Postcode": "",
                    "YearsInAddress": 0,
                    "MonthsInAddress": 0
                }
              ],
              "Email": [
                {
                    "Type": "Email",
                    "EmailAddress": $scope.clientEmail || ''
                }
              ],
              "Notes": $scope.client.notes || '',
              "OrganisationId": ""
          }
        ];
        var clientData = [
          {
              "FamilyId": familyId,
              "PersonId": "",
              "Role": $scope.client.role || '',
              "LastName": $scope.client.lastName || '',
              "FirstName": $scope.client.firstName || '',
              "MiddleName": $scope.client.middleName || '',
              "PreferredName": $scope.client.preferredName || '',
              "Title": $scope.client.title || '',
              "Gender": $scope.client.gender || '',
              "MaritalStatus": "",
              "DOB": $scope.client.dob || '',
              "Age": calculateAge($scope.client.dob) || '',
              "CountryOfBirth": "",
              "Employment": [
                {
                    "CurrentPrevious": "",
                    "Occupation": $scope.clientOccupation || '',
                    "OccupationClass": $scope.clientClassValue || 0,
                    "Employer": "",
                    "BusinessType": "",
                    "Income": {
                        "IncomeId": "",
                        "FrequencyID": "",
                        "Frequency": "",
                        "GrossNet": "",
                        "NetValue": 0,
                        "IsMainSource": true,
                        "LinkToAsset": {
                            "AssetId": "",
                            "Address": {
                                "street_address": "",
                                "route": "",
                                "intersection": "",
                                "political": "",
                                "country": "",
                                "administrative_area_level_1": "",
                                "administrative_area_level_2": "",
                                "administrative_area_level_3": "",
                                "administrative_area_level_4": "",
                                "administrative_area_level_5": "",
                                "colloquial_area": "",
                                "locality": "",
                                "ward": "",
                                "sublocality": "",
                                "sublocality_level_1": "",
                                "sublocality_level_2": "",
                                "sublocality_level_3": "",
                                "sublocality_level_4": "",
                                "sublocality_level_5": "",
                                "neighborhood": "",
                                "premise": "",
                                "subpremise": "",
                                "postal_code": "",
                                "natural_feature": "",
                                "airport": "",
                                "park": "",
                                "point_of_interest": "",
                                "floor": "",
                                "establishment": "",
                                "parking": "",
                                "post_box": "",
                                "postal_town": "",
                                "room": "",
                                "street_number": "",
                                "bus_station": "",
                                "train_station": "",
                                "transit_station": "",
                                "latitude": 0,
                                "longitude": 0,
                                "formatted_address": "",
                                "geoCoded": true,
                                "short_name": "",
                                "countryCode": "",
                                "errorMessage": "",
                                "AddressID": "",
                                "Type": "",
                                "StreetLine1": "",
                                "StreetLine2": "",
                                "City": "",
                                "Postcode": "",
                                "YearsInAddress": 0,
                                "MonthsInAddress": 0
                            },
                            "InsuranceCoverAmount": "",
                            "InsuranceProvider": "",
                            "CurrentOwnership": "",
                            "DevelopmentStatus": "",
                            "Zoning": "",
                            "Tenure": "",
                            "Intention": "",
                            "Valuation": [
                              {
                                  "PropertyValuationId": "",
                                  "Type": "",
                                  "Value": 0,
                                  "IsDefault": true
                              }
                            ],
                            "OwnerFamily": "",
                            "Owners": [
                              {
                                  "Phone": [
                                    {
                                        "Type": "",
                                        "Number": ""
                                    }
                                  ],
                                  "Address": [
                                    {
                                        "street_address": "",
                                        "route": "",
                                        "intersection": "",
                                        "political": "",
                                        "country": "",
                                        "administrative_area_level_1": "",
                                        "administrative_area_level_2": "",
                                        "administrative_area_level_3": "",
                                        "administrative_area_level_4": "",
                                        "administrative_area_level_5": "",
                                        "colloquial_area": "",
                                        "locality": "",
                                        "ward": "",
                                        "sublocality": "",
                                        "sublocality_level_1": "",
                                        "sublocality_level_2": "",
                                        "sublocality_level_3": "",
                                        "sublocality_level_4": "",
                                        "sublocality_level_5": "",
                                        "neighborhood": "",
                                        "premise": "",
                                        "subpremise": "",
                                        "postal_code": "",
                                        "natural_feature": "",
                                        "airport": "",
                                        "park": "",
                                        "point_of_interest": "",
                                        "floor": "",
                                        "establishment": "",
                                        "parking": "",
                                        "post_box": "",
                                        "postal_town": "",
                                        "room": "",
                                        "street_number": "",
                                        "bus_station": "",
                                        "train_station": "",
                                        "transit_station": "",
                                        "latitude": 0,
                                        "longitude": 0,
                                        "formatted_address": "",
                                        "geoCoded": true,
                                        "short_name": "",
                                        "countryCode": "",
                                        "errorMessage": "",
                                        "AddressID": "",
                                        "Type": "",
                                        "StreetLine1": "",
                                        "StreetLine2": "",
                                        "City": "",
                                        "Postcode": "",
                                        "YearsInAddress": 0,
                                        "MonthsInAddress": 0
                                    }
                                  ],
                                  "Email": [
                                    {
                                        "Type": "",
                                        "EmailAddress": ""
                                    }
                                  ],
                                  "Notes": "",
                                  "PersonId": "",
                                  "OrganisationId": ""
                              }
                            ],
                            "Type": "",
                            "PropertyType": "",
                            "TypeOther": "",
                            "Description": "",
                            "Value": 0,
                            "Borrowers": [
                              {
                                  "BorrowerID": 0,
                                  "FirstName": "",
                                  "LastName": "",
                                  "IsInclude": true,
                                  "IsEntity": true
                              }
                            ],
                            "OtherInformation": "",
                            "FinancialID": ""
                        },
                        "AssetAddress": {
                            "street_address": "",
                            "route": "",
                            "intersection": "",
                            "political": "",
                            "country": "",
                            "administrative_area_level_1": "",
                            "administrative_area_level_2": "",
                            "administrative_area_level_3": "",
                            "administrative_area_level_4": "",
                            "administrative_area_level_5": "",
                            "colloquial_area": "",
                            "locality": "",
                            "ward": "",
                            "sublocality": "",
                            "sublocality_level_1": "",
                            "sublocality_level_2": "",
                            "sublocality_level_3": "",
                            "sublocality_level_4": "",
                            "sublocality_level_5": "",
                            "neighborhood": "",
                            "premise": "",
                            "subpremise": "",
                            "postal_code": "",
                            "natural_feature": "",
                            "airport": "",
                            "park": "",
                            "point_of_interest": "",
                            "floor": "",
                            "establishment": "",
                            "parking": "",
                            "post_box": "",
                            "postal_town": "",
                            "room": "",
                            "street_number": "",
                            "bus_station": "",
                            "train_station": "",
                            "transit_station": "",
                            "latitude": 0,
                            "longitude": 0,
                            "formatted_address": "",
                            "geoCoded": true,
                            "short_name": "",
                            "countryCode": "",
                            "errorMessage": "",
                            "AddressID": "",
                            "Type": "",
                            "StreetLine1": "",
                            "StreetLine2": "",
                            "City": "",
                            "Postcode": "",
                            "YearsInAddress": 0,
                            "MonthsInAddress": 0
                        },
                        "AssetIsExisting": true,
                        "IsGross": true,
                        "IsExisting": true,
                        "OwnerFamily": "",
                        "Owners": [
                          {
                              "Phone": [
                                {
                                    "Type": "",
                                    "Number": ""
                                }
                              ],
                              "Address": [
                                {
                                    "street_address": "",
                                    "route": "",
                                    "intersection": "",
                                    "political": "",
                                    "country": "",
                                    "administrative_area_level_1": "",
                                    "administrative_area_level_2": "",
                                    "administrative_area_level_3": "",
                                    "administrative_area_level_4": "",
                                    "administrative_area_level_5": "",
                                    "colloquial_area": "",
                                    "locality": "",
                                    "ward": "",
                                    "sublocality": "",
                                    "sublocality_level_1": "",
                                    "sublocality_level_2": "",
                                    "sublocality_level_3": "",
                                    "sublocality_level_4": "",
                                    "sublocality_level_5": "",
                                    "neighborhood": "",
                                    "premise": "",
                                    "subpremise": "",
                                    "postal_code": "",
                                    "natural_feature": "",
                                    "airport": "",
                                    "park": "",
                                    "point_of_interest": "",
                                    "floor": "",
                                    "establishment": "",
                                    "parking": "",
                                    "post_box": "",
                                    "postal_town": "",
                                    "room": "",
                                    "street_number": "",
                                    "bus_station": "",
                                    "train_station": "",
                                    "transit_station": "",
                                    "latitude": 0,
                                    "longitude": 0,
                                    "formatted_address": "",
                                    "geoCoded": true,
                                    "short_name": "",
                                    "countryCode": "",
                                    "errorMessage": "",
                                    "AddressID": "",
                                    "Type": "",
                                    "StreetLine1": "",
                                    "StreetLine2": "",
                                    "City": "",
                                    "Postcode": "",
                                    "YearsInAddress": 0,
                                    "MonthsInAddress": 0
                                }
                              ],
                              "Email": [
                                {
                                    "Type": "",
                                    "EmailAddress": ""
                                }
                              ],
                              "Notes": "",
                              "PersonId": "",
                              "OrganisationId": ""
                          }
                        ],
                        "Type": "",
                        "PropertyType": "",
                        "TypeOther": "",
                        "Description": "",
                        "Value": 0,
                        "Borrowers": [
                          {
                              "BorrowerID": 0,
                              "FirstName": "",
                              "LastName": "",
                              "IsInclude": true,
                              "IsEntity": true
                          }
                        ],
                        "OtherInformation": "",
                        "FinancialID": ""
                    },
                    "YearsEmployment": 0,
                    "MonthsEmployment": 0,
                    "IncomeDetails": ""
                }
              ],
              "SmokerStatus": $scope.client.smokerStatus,
              "LivingStatus": "",
              "Deceased": $scope.client.deceased,
              "NZResident": true,
              "DOBReminder": $scope.client.DOBReminder,
              "BestTimeToCall": $scope.clientTimeToCall + ' ' + $scope.timePeriod,
              "Phone": getPhones(),
              "Address": [
                {
                    "street_address": "",
                    "route": "",
                    "intersection": "",
                    "political": "",
                    "country": "",
                    "administrative_area_level_1": "",
                    "administrative_area_level_2": "",
                    "administrative_area_level_3": "",
                    "administrative_area_level_4": "",
                    "administrative_area_level_5": "",
                    "colloquial_area": "",
                    "locality": "",
                    "ward": "",
                    "sublocality": "",
                    "sublocality_level_1": "",
                    "sublocality_level_2": "",
                    "sublocality_level_3": "",
                    "sublocality_level_4": "",
                    "sublocality_level_5": "",
                    "neighborhood": "",
                    "premise": "",
                    "subpremise": "",
                    "postal_code": "",
                    "natural_feature": "",
                    "airport": "",
                    "park": "",
                    "point_of_interest": "",
                    "floor": "",
                    "establishment": "",
                    "parking": "",
                    "post_box": "",
                    "postal_town": "",
                    "room": "",
                    "street_number": "",
                    "bus_station": "",
                    "train_station": "",
                    "transit_station": "",
                    "latitude": 0,
                    "longitude": 0,
                    "formatted_address": "",
                    "geoCoded": true,
                    "short_name": "",
                    "countryCode": "",
                    "errorMessage": "",
                    "AddressID": "",
                    "Type": "",
                    "StreetLine1": "",
                    "StreetLine2": "",
                    "City": "",
                    "Postcode": "",
                    "YearsInAddress": 0,
                    "MonthsInAddress": 0
                }
              ],
              "Email": [
                {
                    "Type": "Email",
                    "EmailAddress": $scope.clientEmail || ''
                }
              ],
              "Notes": $scope.client.notes || '',
              "OrganisationId": ""
          }
        ];
        contactDetailService.postContacts(clientData, personData).then(function (response) {
            getFamilyInformationOnly();
            $('#client').modal('hide');
        }, function (error, errorStatus) {
            //error message if needed
        })
    };
    function getEmployments() {
        var employment = {};
        employment.Occupation = $scope.clientOccupation;
        employment.OccupationClass = $scope.clientClassValue;
        employment.Employer = $scope.clientEmployer;
        return employment;
    };

    function getPhones() {
        var phone = [];
        if ($scope.clientPhone.home) {
            var home = {
                type: 'Home',
                number: $scope.clientPhone.home
            };
            phone.push(home);
        }
        if ($scope.clientPhone.business) {
            var business = {
                type: 'Business',
                number: $scope.clientPhone.business
            };
            phone.push(business);
        }
        if ($scope.clientPhone.mobile) {
            var mobile = {
                type: 'mobile',
                number: $scope.clientPhone.mobile
            };
            phone.push(mobile);
        }
        return phone;
    };
    function getEmails() {
        var email = [];
        if ($scope.clientEmail) {
            var data = {
                type: 'Email',
                emailAddress: $scope.clientEmail
            };
            email.push(data);
        }

        return email;
    };

    
    //===================== End of Add Client Modal ======================================

}]);