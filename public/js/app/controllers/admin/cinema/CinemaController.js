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
            $scope.projections.sort((a, b) => a.time - b.time);
            $scope.projections.forEach(function(projection) {
              return projection.time = moment(new Date(projection.time * 1000)).format('MMMM Do YYYY HH:mm');
            });
            console.log(projections, 'data');
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
})