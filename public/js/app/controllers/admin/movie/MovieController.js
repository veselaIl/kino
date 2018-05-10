myApp.controller('MovieController', function($scope, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movies = [];

    MovieService.getMovies()
        .then(function(movies){
            console.log('then', movies);
            $scope.movies = movies;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
        
})