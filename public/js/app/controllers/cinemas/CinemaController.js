app.controller('CinemaController', function ($scope, $rootScope, $routeParams, CinemaService) {   
    //GET All cinemas page
    CinemaService.getCinemas()
        .then(function (cinemas){
            console.log('CinemaController CinemaService.getCinemas(): ', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

    //Get current Cinema Page
    CinemaService.getCinema($routeParams.id)
        .then(function (cinema){
            $scope.cinema = cinema;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

    $scope.cinemas = [];
    $scope.cinema = {};
});