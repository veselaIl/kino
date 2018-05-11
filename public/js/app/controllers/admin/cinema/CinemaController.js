myApp.controller('CinemaController', function($scope, CinemaService){
    $scope.title='Кина';
    $scope.newMovie = {};
    $scope.cinemas = [];

    CinemaService.getCinemas()
        .then(function(cinemas){
            console.log('then', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
        
})