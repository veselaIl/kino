app.controller('BookProjectionController', ['$scope', 'ProjectionService', 'CinemaService', function($scope, ProjectionService, CinemaService){
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
    }

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
            $scope.$apply();
            console.log(cinemas);
        })
    console.log($scope);
    moment.locale("bg");
}])