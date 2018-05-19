app.controller('UserController', function ($scope, $routeParams, $rootScope, UserService){
    var errors = [], 
        sending = false;
    
    $scope.isInFavourites = $rootScope.user
            && $rootScope.user.favourites
            && $rootScope.user.favourites.indexOf($routeParams.movieID) !== -1;

    $scope.addToFavourites = function($event){
        $event.preventDefault();
        //check if user send again request to the server, if it is - !sending stop request over again
        if(!sending){
            sending = true;
            UserService.addToFavourites($routeParams.movieID)
                .then(function (movie){
                    //check if current movie is in favourites if it is, then remove it/add it to favourites list
                    var index = $rootScope.user.favourites.indexOf($routeParams.movieID);
                    if (index !== -1){
                        $rootScope.user.favourites.splice(index, 1);
                    } else {
                        $rootScope.user.favourites.push($routeParams.movieID);
                    }
                    sending = false;

                    $scope.isInFavourites = index === -1;
                    $scope.$apply();
                })
                .catch(function (err){
                    sending = false;
                    errors.push(err);
                });
        }
    }

    console.log('$rootScope.user:', $rootScope.user);

})