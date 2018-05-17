app.controller('MovieController', function ($scope, $routeParams, MovieService) {
    $scope.title = "Филми";
    $scope.movies = [];
    $scope.movie = {};
    var errors = [];

    // MovieService.getMovies()
    //     .then(function (movies){
    //         $scope.movies = movies;
    //         console.log('Movie Controller: movies', movies);
    //         $scope.$apply();
    //     })
    //     .catch(function (err){
    //         errors.push(err);
    //     })
    MovieService.getMovies()
    .then(function(movies){
        // console.log('then', movies);
        $scope.movies = movies;
        $scope.movie = movies.find(movie => movie.movieID === +$routeParams.id);
        $scope.$apply();
        
    })
    .catch(function(err){
        console.log(err);
    })

    // MovieService.getMovie($routeParams.id)
    //     .then(function (movie){
    //         $scope.movie = movie;
    //         $scope.$apply;
    //     })
    //     .catch(function (err){
    //         errors.push(err);
    //     })
})