'use strict';
app.controller('loginController', ['$scope', 'authService', '$window',  function ($scope, authService, $window) {
    $scope.loginData = {
        username: '',
        password: ''
    };
    $scope.isLogin = false;
    $scope.message = '';
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            
            var retUrl = sessionStorage.getItem('returnUrl');
            if (retUrl) {
                $window.location.href = 'index.html#' + retUrl;
            }
            else
            {
                sessionStorage.setItem('activeTab', 'dashboard');
                $window.location.href = 'index.html';
            }
            
        }, function (err) {
            $scope.isLogin = true;
            $scope.message = 'Invalid Username or Password';
        });
    };
}]);