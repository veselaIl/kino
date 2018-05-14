myApp.controller('CinemaController', function($scope, CinemaService, ProjectionService){
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
    ProjectionService.getProjections()
        .then(function(projections){
            $scope.projections = projections;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
})