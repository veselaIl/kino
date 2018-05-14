app.controller('LoginController', function ($scope, LoginService) {
    $scope.title = 'Вход';
    $scope.initUser = {
        email: '',
        password: ''
    }
    $scope.loggedUser = angular.copy($scope.initUser);
    console.log('Logged User: ', $scope.loggedUser);

    $scope.loginUser = function ($event, loggedUser){
        var email = $scope.loggedUser.email,
            password = $scope.loggedUser.password;
        LoginService.loginUser(loggedUser);
    }
})