app.controller('RegisterController', function ($scope, $location, $rootScope, RegisterService) {
    $scope.users = [];
    $scope.initUser = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    console.log('initUser', $scope.initUser);
    console.log('$scope', $scope);
    $scope.newUser = angular.copy($scope.initUser);
    console.log($scope.newUser);

    $scope.registerUser = function($event, invalid){
        $event.preventDefault();
        // тук трябва да се направи проверка if(validate)...имам валидации при създаване на филм.
        console.log('$scope Register', $scope);
        if(!invalid){
            RegisterService.registerUser($scope.newUser)
                .then(function (data){
                    console.log('Register Controller $rootScope.user', $rootScope.user);
                    $rootScope.user = data;                    
                    console.log('Register Controller data', data);
                    console.log('Регистрацията е успешна!');
                    if($rootScope.user.isAdmin === true){
                        $location.path('/admin');
                    } else {
                        $location.path('/');
                    }
                    $scope.$apply();
                })
                .catch(function (err){
                    console.log(err);
                })
            
        }
        
        //тук сменяш window.location При успешен вход
    }

})