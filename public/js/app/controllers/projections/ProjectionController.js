app.controller('ProjectionController', ['$scope', 'ProjectionService', function($scope, ProjectionService){
    $scope.projections = [];

    
    //Get all projections
    ProjectionService.getProjections()
        .then(function (projections){
            $scope.projections = projections;
            console.log('Projections: ', projections);
            // $scope.movie = getMovieById(movieID);
            // console.log('$scope.movie', $scope.movie);
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        });

    // function getMovieById(id){
    //     return filter($scope.movie, {_id: movieID}, true)[0];
    // }
}])