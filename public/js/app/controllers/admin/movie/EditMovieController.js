myApp.controller('EditMovieController', function($scope, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movie = {};
    console.log($scope);
    MovieService.getMovie()
        .then(function(movie){
            console.log('then', movie);
            $scope.movie = movie;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
        
})