app.controller('RegisterController', function ($scope, RegisterService) {
    $scope.users = [];
    $scope.initUser = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    console.log('initUser', $scope.initUser);
    $scope.newUser = angular.copy($scope.initUser);
    console.log($scope.newUser);
    //$scope.newUser = {};

    // UsersService.getUsers()
    //     .then(function (users){
    //         console.log('RegisterController - users', users);
    //         $scope.apply(function () {
    //             $scope.users = users;
    //         })
    //     })
    //     .catch(function (err){
    //         console.log('Error: ', err);
    //     })

    $scope.registerUser = function($event, newUser){
        console.log('registerUser', $scope.newUser);
        var email = $scope.newUser.email,
            password = $scope.newUser.password,
            confirmPassword = $scope.newUser.confirmPassword;
        RegisterService.registerUser(newUser);
    }

    
})