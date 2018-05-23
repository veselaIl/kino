app.controller('ProjectionController', ['$scope', 'ProjectionService', 'CinemaService', function($scope, ProjectionService, CinemaService){
    $scope.projections = [];
<<<<<<< HEAD
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
    }

    for (var i = 0; i < 7; i++){
        $scope.week.push(moment().add(i,'days'));
    }
    $scope.activeDay = $scope.week[0];
    
    // function getMovieById(id){
    //     return filter($scope.movie, {_id: movieID}, true)[0];
    // }
    //Get all projections
    ProjectionService.getProjections()
    .then(function (data){
        $scope.projections = data.projections;
        // console.log('Projections: ', projections);
        // $scope.movie = getMovieById(movieID);
        // console.log('$scope.movie', $scope.movie);
        $scope.$apply();
        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, []);
        };
        $scope.movies = groupBy($scope.projections, 'movie');
        var arr = [];
        var obj = $scope.movies;    
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(prop)
            }
        }
        ProjectionService.getMoviesByNames(arr)
           .then(function (response){
               $scope.movieDetails = response;
            })
        console.log(typeof $scope.movies[movie.name], 'FИЛМИ');
        

    })
    .catch(function (err){
        console.log(err);
    });
    
    CinemaService.getCinemas()
        .then(function (cinemas){
            $scope.cinemas = cinemas.cinemas;
=======
    $scope.movie = {};
    $scope.kino = {};

    //Get all projections
    ProjectionService.getProjections()
        .then(function (projections){
            $scope.projections = projections;
            $scope.movie = projections.movie;
            $scope.kino = projections.kino;
            console.log('Projections: ', projections);
>>>>>>> 1c50d283cdc42a73e12bbb787d2c6677c1164354
            $scope.$apply();
            console.log(cinemas);
        })
<<<<<<< HEAD
    console.log($scope);
    moment.locale("bg");
=======
        .catch(function (err){
            console.log(err);
        });

>>>>>>> 1c50d283cdc42a73e12bbb787d2c6677c1164354
}])