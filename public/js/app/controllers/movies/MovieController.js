app.controller('MovieController', function ($scope, $routeParams, MovieService, ProjectionService) {
    $scope.title = "Филми";
    var errors = [];

    //Get all movies 
    // MovieService.getMovies()
    //     .then(function (movies){            
    //         console.log('Movie Controller: movies', movies);
    //         $scope.movies = movies;
    //         $scope.$apply();
    //     })
    //     .catch(function (err){
    //         errors.push(err);
    //     })

    

    function showMovieProjections(id, date) {
        ProjectionService.getMovieProjections(id, date)
            .then(function (data) {
                console.log('showMovieProjections data', data);
                $scope.projections = Array.isArray(data.projections) ? data.projections : [];
                $scope.movieDetails = data.movie ? data.movie : {};
                console.log('$scope.movieDetails', $scope.movieDetails);
                //$scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.cinemas = Array.isArray(data.cinemas) ? data.cinemas : [];
                //$scope.movieProjections = Array.isArray(data.times) ? data.times : [];
                $scope.$apply();
            })
            .catch(function (err){
                console.log(err);
            });
    }

    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];
    for (var i = 0; i < 7; i++){
        $scope.week.push(moment().add(i,'days'));
    }
    $scope.activeDay = $scope.week[0];
    console.log('activeDay ' + $scope.activeDay, $scope.activeDay);
    $scope.setActive = function(day){
        console.log('setActive ' + day, day);
        console.log();
        $scope.activeDay = day;
        console.log('$scope.activeDay', $scope.activeDay);
        console.log('$routeParams.id', $routeParams);
        showMovieProjections($routeParams.id, day.toDate());
    }

    console.log('projections getProjections');
    showMovieProjections($routeParams.id, $scope.activeDay.toDate());
  
    moment.locale("bg");

    //Get current movie info
    // MovieService.getMovie($routeParams.id)
    //    .then(function (movie){
    //         $scope.movie = movie;
    //         console.log('$scope.movie', $scope.movie);
    //         // console.log("Genre: ", movie.genre);
    //         // $scope.movie.genre = movie.genre;
    //         console.log('Actors:', movie.actors);
    //         $scope.actor = movie.actors.forEach(a => {
    //             console.log("Actor: ", a.name);
    //             return a.name;
    //         });
    //         $scope.$apply();
    //    })
    //    .catch(function (err){
    //         errors.push(err);
    //    })

       

})