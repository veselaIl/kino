myApp.controller('EditMovieController', function($scope, $routeParams, MovieService){
    $scope.newMovie = {};
    $scope.movie = {};
    
    MovieService.getMovie($routeParams.id)
        .then(function (movie){
            console.log('then', );
            $scope.movie = movie;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
    })   
        
})