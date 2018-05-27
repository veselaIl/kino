app.controller('CinemaController', function ($scope, $rootScope, $routeParams, CinemaService, ProjectionService) {   
    //GET All cinemas page
    CinemaService.getCinemas()
        .then(function (cinemas){
            console.log('CinemaController CinemaService.getCinemas(): ', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

    //Get current Cinema Page
    CinemaService.getCinema($routeParams.id)
        .then(function (cinema){
            $scope.cinema = cinema;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

     
    function showCinemaProjections(id, date) {
        ProjectionService.getCinemaProjections(id, date)
            .then(function (data) {
                console.log('showCinemaProjections data', data);
                $scope.projections = Array.isArray(data.projections) ? data.projections : [];
                $scope.cinemaDetails = data.cinema ? data.cinema : {};
                //$scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                //$scope.movieProjections = Array.isArray(data.times) ? data.times : [];
                $scope.$apply();
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
        console.log('$scope.activeDay', $scope.activeDay);
        showCinemaProjections($routeParams.id, day.toDate());
    }

    //Get all projections
    console.log('projections getProjections');
    showCinemaProjections($routeParams.id, $scope.activeDay.toDate());
    
    // CinemaService.getCinemas()
    //     .then(function (cinemas){
    //         $scope.cinemas = cinemas.cinemas;
    //         $scope.$apply();
    //         console.log(cinemas);
    //     })
    // console.log($scope);
    moment.locale("bg");
    $scope.cinemas = [];
    $scope.cinema = {};
});