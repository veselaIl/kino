app.controller('ProjectionController', ['$scope', 'ProjectionService', 'CinemaService', function($scope, ProjectionService, CinemaService){
    
    function groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, []);
    };

    function showProjections(date) {
        ProjectionService.getProjections(date)
        .then(function (data) {
            console.log('data', data);
            $scope.projections = Array.isArray(data.projections) ? data.projections : [];
            $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
            // $scope.movie = getMovieById(movieID);
            // console.log('$scope.movie', $scope.movie);
            $scope.$apply();
            
            //$scope.movies = groupBy($scope.projections, 'movieID');
            /*movies = [];
            data.forEach(p => {
                if (movies.indexOf(p.movieID) === -1) {
                    movies.push(p.movieID);
                }
            });
            console.log('movies', movies);
            ProjectionService.getMoviesByID(arr)
                .then(function (response){
                    console.log("Projection Controller movieDetails", response);
                    $scope.movieDetails = response;
                    $scope.$apply();
                });
                */
            //console.log(typeof $scope.movies[movie.movieID], 'FИЛМИ');

        })
        .catch(function (err){
            console.log(err);
        });
    }
    
    $scope.projections = [];
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
        console.log($scope.activeDay);
        showProjections(day.toDate());
    }
    
    // function getMovieById(id){
    //     return filter($scope.movie, {_id: movieID}, true)[0];
    // }
    //Get all projections
    console.log('projections getProjections');
    showProjections($scope.activeDay.toDate());
    
    
    CinemaService.getCinemas()
        .then(function (cinemas){
            $scope.cinemas = cinemas.cinemas;
            $scope.$apply();
            console.log(cinemas);
        })
    console.log($scope);
    moment.locale("bg");
}])