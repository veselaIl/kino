app.controller('CollapseController', function ($scope, $rootScope, $http, $sessionStorage, $location, $timeout) {

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

        $http.get('/logout')
            .then(function (response){
                $rootScope.user = null;
                $sessionStorage.$reset();
                $location.path('/');
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            })
    }

    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    $scope.userChecked = false;

    //$timeout(checkUser, 1000);
    checkUser();
});

