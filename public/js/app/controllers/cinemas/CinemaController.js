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
                $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.$apply();
            })
            .catch(function (err){
                console.log(err);
            });
    }
    $scope.cinemas = [];
    $scope.cinema = {};
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
        if($routeParams.id){
            showCinemaProjections($routeParams.id, day.toDate());
        }
        
    }

    console.log('projections getProjections');
    showCinemaProjections($routeParams.id, $scope.activeDay.toDate());
  
    moment.locale("bg");
    
});