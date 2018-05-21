app.controller('ProjectionController', ['$scope', 'ProjectionService', function($scope, ProjectionService){
    $scope.projections = [];
    $scope.movie = {};
    $scope.kino = {};

    //Get all projections
    ProjectionService.getProjections()
        .then(function (projections){
            $scope.projections = projections;
            $scope.movie = projections.movie;
            $scope.kino = projections.kino;
            console.log('Projections: ', projections);
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        });

}])