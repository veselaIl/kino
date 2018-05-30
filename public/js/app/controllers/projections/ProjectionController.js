app.controller('ProjectionController', ['$scope', '$routeParams', 'ProjectionService', 'MovieService' ,function($scope, $routeParams, ProjectionService, MovieService){
    

    MovieService.getMovie($routeParams.id)
    .then(function (data){
         $scope.movie = data.movie;
         console.log('$scope.movie', $scope.movie);
         // console.log("Genre: ", movie.genre);
         // $scope.movie.genre = movie.genre;
         $scope.$apply();
    })
    .catch(function (err){
         errors.push(err);
    })
    
    function showProjections(date) {
        ProjectionService.getProjections(date)
            .then(function (data) {
                // console.log('showProjections data', data);
                $scope.projections = Array.isArray(data.projections) ? data.projections : [];
                $scope.cinemaDetails = Array.isArray(data.cinemas) ? data.cinemas : [];
                //$scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                //$scope.price = data.movies
                data.movies.forEach(m => {
                    console.log("Movie type", m.type);
                });
                //$scope.movieProjections = Array.isArray(data.times) ? data.times : [];
                console.log($scope.projections, 'projections')
                console.log($scope);
                $scope.$apply();
            })
            .catch(function (err){
                $scope.projections = [];
                $scope.$apply();
                console.log($scope.projections);
                console.log(err);
               
            });
    }
    console.log($scope.projections, 'scope projections'); 
    
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];
    for (var i = 0; i < 7; i++){
        $scope.week.push(moment().add(i,'days'));
    }
    $scope.activeDay = $scope.week[0];
    // console.log('activeDay ' + $scope.activeDay, $scope.activeDay);
    $scope.setActive = function(day){
        // console.log('setActive ' + day, day);
        // console.log();
        console.log(day);
        $scope.activeDay = day;
        // console.log('$scope.activeDay', $scope.activeDay.getTime());
        showProjections(day.toDate());
    }

    $scope.getCinemaById = function(kinoID) {
       return $scope.cinemaDetails.find(cinema => cinema.kinoID === kinoID);
    }
    $scope.getMovieById = function (movieID) {
        return $scope.movieDetails.find(movie => movie.movieID === movieID);
    }

    $scope.prices = [12, 8, 15];
    //Get all projections
    console.log('projections getProjections');
    showProjections($scope.activeDay.toDate());

    moment.locale("bg");
}])