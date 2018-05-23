app.controller('UserController', function ($scope, $routeParams, $rootScope, $location, UserService){
    var errors = [], 
        sending = false;

    $scope.user = {};
    //init user for changing password
    $scope.passUser = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };
    $scope.newPassUser = angular.copy($scope.passUser);
    //$scope.user.firstName = user.firstName;
    
    //check if user is logged, if user has favourites and if current moivie is in favourites
    $scope.isInFavourites = $rootScope.user
            && $rootScope.user.favourites
            && $rootScope.user.favourites.indexOf($routeParams.id) !== -1;
    // console.log('$routeParams.movieID', $routeParams.movieID);
    // console.log('$routeParams.id', $routeParams.id);

    $scope.addToFavourites = function($event){
        $event.preventDefault();
        console.log('addToFavourites');
        //check if user send again request to the server, if it is - !sending stop request over again
        if(!sending){
            sending = true;
            if($rootScope.user){
                UserService.addToFavourites($routeParams.id)
                .then(function (movie){
                    //check if current movie is in favourites if it is, then remove it/add it to favourites list
                    var index = $rootScope.user.favourites.indexOf($routeParams.id);
                    if (index !== -1){
                        $rootScope.user.favourites.splice(index, 1);
                    } else {
                        $rootScope.user.favourites.push($routeParams.id);
                    }
                    sending = false;

                    $scope.isInFavourites = index === -1;
                    $scope.$apply();
                })
                .catch(function (err){
                    sending = false;
                    errors.push(err);
                });
            } else {
                $location.path('/login');
            }
            
        }
    }

    //console.log('$rootScope.user:', $rootScope.user);

    //Show user info
    $scope.profile = function ($event){
        $event.preventDefault();

        if(!$rootScope.user){
            $location.path('/login');
        } else {
            UserService.showUserInfo($scope.user)
                .then(function (data){
                    $scope.user = data;
                    console.log('$scope.user = data;', data);
                    $location.path('/profile');
                    $scope.$apply();
                })
                .catch(function (err){
                    errors.push(err);
                })
        }
    }
    
    
    //change user firstName and user lastName
    $scope.changeUserInfo = function ($event){
        $event.preventDefault();

        if(!$rootScope.user){
            $location.path('/login');
        } else {
            UserService.changeUserInfo($scope.newPassUser)
            .then(function (data){
                $rootScope.user = data;
                $scope.$apply();
            })
            .catch(function (err){
                errors.push(err);
            })
        }        
    }

    $scope.changePassword = function ($event){
        $event.preventDefault();

        if(!$rootScope.user){
            $location.path('/login');
        } else {
            console.log('$scope.newPassUser', $scope.newPassUser);
            UserService.changePassword($scope.newPassUser)
                .then(function (data){
                    $rootScope.user = data;
                    $scope.$apply();
                })
                .catch(function (err){
                    errors.push(err);
                })
        }
    }

    $scope.movies = [];

    if(!$rootScope.user){
        $location.path('/login');
    } else {
        UserService.getFavourites($scope.user)
            .then(function (data){
                //$rootScope.user = data;
                $scope.movies = data;
                console.log('getFavourites', data);
                $scope.$apply();
            })
            .catch(function (err){
                errors.push(err);
            });
    }
})