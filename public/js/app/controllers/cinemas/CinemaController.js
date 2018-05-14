app.controller('CinemaController', function ($scope, CinemaService) {
    //$scope.title = "Cinema";
    $scope.cinemas = [];
    console.log(CinemaService.getCinemas());
    CinemaService.getCinemas()
        .then(function (cinemas){
            console.log('CinemaController: ', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })
});