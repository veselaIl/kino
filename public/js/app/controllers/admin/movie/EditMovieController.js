myApp.controller('EditMovieController', function($scope, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movies = [];

    MovieService.getMovie(id)
        .then(function(movies){
            console.log('then', movies);
            $scope.movies = movies;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
        
})