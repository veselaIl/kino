app.controller('LoginController', ['$scope', '$rootScope', '$location', 'LoginService',
              function($scope, $rootScope, $location, LoginService){

    $scope.title = 'Вход';
    $scope.initUser = {
        email: '',
        password: ''
    };
    $scope.user = angular.copy($scope.initUser);

    $scope.loginUser = function ($event, invalid){
        $event.preventDefault();
        if(!invalid){
            LoginService.loginUser($scope.user)
                .then(function(data){
                    console.log('Login success!', data);
                    $rootScope.user = data;
                    if($rootScope.user.isAdmin === true){
                        $location.path('/admin.html');
                    } else {
                        $location.path('/');
                    }
                    $scope.$apply();
                })
                .catch(function (err){
                    console.log(err);
                });
        }        
    }
}]);