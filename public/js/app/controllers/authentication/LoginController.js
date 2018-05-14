app.controller('LoginController', ['$scope', '$rootScope', '$location', 'LoginService',
              function($scope, $rootScope, $location, LoginService){

    $scope.title = 'Вход';
    $scope.initUser = {
        email: '',
        password: ''
    }
    $scope.loggedUser = angular.copy($scope.initUser);
    console.log('Logged User: ', $scope.loggedUser);

    //отново подаваш два аргумента, а във формата loginUser приема само $event
    // $scope.loginUser = function ($event, loggedUser){
    $scope.loginUser = function ($event){
        //липсва preventDefault
        $event.preventDefault();
        // console.log($scope)
        // var email = $scope.loggedUser.email,
        //     password = $scope.loggedUser.password;

        // мисля че другите са ти излишни. Когато се чудиш къде ти се пазят данните
        // си направи console.log($scope)
        LoginService.loginUser($scope.user).then(function(response){
            if($rootScope.user.isAdmin === true){
               window.location.href = '/admin.html';
            }else{
                $location.path('/');
            }
            // $rootScope.isLogged = true;
            // $rootScope.user = response.data;
            // $location.path('/admin.html');
            // $rootScope.$apply();
        });
    }
}]);