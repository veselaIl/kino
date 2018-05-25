app.controller('UserController', function ($scope, $routeParams, $rootScope, $location, UserService, MovieService){
    //check if user is logged, if user has favourites and if current moivie is in favourites
    $scope.isInFavourites = $rootScope.user
            && $rootScope.user.favourites
            && $rootScope.user.favourites.indexOf($routeParams.id) !== -1;

    //adding movie to users favourites
    $scope.addToFavourites = function($event){
        $event.preventDefault();
        //console.log('addToFavourites');
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

    //Show user's first and last names
    $scope.profile = function ($event){
        $event.preventDefault();

        if(!$rootScope.user){
            $location.path('/login');
            console.log('No $rootScope.user');
        } else {
            console.log('$rootScope.user', $rootScope.user);
            UserService.showUserInfo()
                .then(function (data){
                    // $scope.firstName = data.firstName;
                    // $scope.lastName = data.lastName;
                    // $scope.email = data.email;
                    $scope.user.firstName = data.firstName;
                    $scope.user.lastName = data.lastName;
                    $scope.user.email = data.email;
                    console.log('$scope.user = data;', data);
                    // $location.path('/profile');
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
        } else {                        //$scope.newPassUser
            UserService.changeUserInfo($scope.user)
            .then(function (data){
                $rootScope.user = data;
                $scope.$apply();
            })
            .catch(function (err){
                errors.push(err);
            })
        }        
    }

    //Change user password 
    $scope.changePassword = function ($event){
        $event.preventDefault();

        if(!$rootScope.user){
            $location.path('/login');
        } else {
            console.log('$scope.newPassUser', $scope.user);
            UserService.changePassword($scope.user)
                .then(function (data){
                    $rootScope.user = data;
                    $scope.$apply();
                })
                .catch(function (err){
                    errors.push(err);
                })
        }
    }

    //Get User favourites page
    if(!$rootScope.user){
        $location.path('/login');
    } else {
        UserService.getFavourites()
            .then(function (data){
                //$rootScope.user = data;
                $scope.user.favourites = data;
                console.log('UserController getFavourites $scope.movies', $scope.movies);
                $scope.$apply();
            })
            .catch(function (err){
                errors.push(err);
            });
    }    

    //Active menu item in user profile menu
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };

   
   var errors = [], 
       sending = false;
    
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        favourites: [],
        reservations: [],
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };
})