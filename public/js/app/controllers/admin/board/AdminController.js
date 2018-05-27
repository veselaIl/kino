myApp.controller('AdminController', function($scope, $rootScope, $location, $timeout, $http) {
    $scope.title = 'Admin';
 
    function checkUser() {
        $http.get('/active-user')
            .then(function(response) {
                $scope.userChecked = true;
                $rootScope.user = response.data;
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            })
            .catch(function() {
                $scope.userChecked = true;
                $timeout(function () {
                    $scope.$apply();
                    $timeout(checkUser, 1000);
                }, 0);
            });
    }    
    $scope.logout = function ($event){
        $event.preventDefault();
        $http.get('/api/logout')
            .then(function (response){
                console.log($rootScope);
                console.log(response);
                $rootScope.user = null;
                window.location.href = '/';
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            })
    }
});