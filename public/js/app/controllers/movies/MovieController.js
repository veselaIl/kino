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
    var dates = [];
    $scope.suitable = [ 
        { value : '1', name:'12+'},
        { value: '2', name:'16+'},
        { value: '3', name: 'Без ограничения'}
    ]

    MovieService.getMovie($routeParams.id)
       .then(function (data){
            console.log(data, 'MOVIE DETAILS MOVIE CONTROLLER');
            $scope.movie = data;
            $scope.movie.projections.forEach(element => {
                var mom = moment(element.time * 1000);
                dates.push(mom)
                element.time = moment(element.time * 1000);
            });
            $scope.filterDates = [];
            dates.forEach(function(date){
                if($scope.filterDates.indexOf(date.format('DD MMMM')) === -1){
                    $scope.filterDates.push(date.format('DD MMMM'));
                }
                console.log($scope.filterDates, 'filter')
            })          
            
            console.log($scope.movie.projections);
            console.log(dates);
            $scope.$apply();
       })
       .catch(function (err){
            errors.push(err);
       })
    $scope.checkDate = function(item, projections){
        console.log(item, 'item');
        console.log(date, 'date');
        projections.forEach(function(p){
          return  p.time.format('DD MM') === item.format('DD MM') 
        });
        // return item.format('DD MM') === date.format('DD MM')
    }
    $scope.checkItem = function(item, cinema){
        console.log($scope);
        var filter = $scope.movie.projections.some(projection => projection.kinoID === cinema.kinoID);
        console.log(filter, 'checkItem')
        if(filter.length){
         console.log(item);// console.log(filter.some(projection => projection.time.format('DD MMMM') === item));
          filter.some(projection => projection.time.format('DD MMMM') === item)
        }
    }
    function showMovieProjections(id, date) {
        ProjectionService.getMovieProjections(id, date)
            .then(function (data) {
                console.log('showMovieProjections data', data);
                $scope.projections = Array.isArray(data.projections) ? data.projections : [];
                $scope.movieDetails = data.movie ? data.movie : {};
                // console.log('$scope.movieDetails', $scope.movieDetails);
                $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.cinemas = Array.isArray(data.cinemas) ? data.cinemas : [];
                $scope.movieProjections = Array.isArray(data.times) ? data.times : [];
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
    // $scope.activeDay = $scope.week[0];
    console.log('activeDay ' + $scope.activeDay, $scope.activeDay);
    $scope.setActive = function(day){
        console.log('setActive ' + day, day);
        console.log();
        $scope.activeDay = day;
        console.log('$scope.activeDay', $scope.activeDay);
        console.log('$routeParams.id', $routeParams);
        // showMovieProjections($routeParams.id, day.toDate());
    }  

    console.log('projections getProjections');
    if($scope.activeDay){
        showMovieProjections($routeParams.id, $scope.activeDay.toDate());
    }

    moment.locale("bg");

    $scope.loginNotRequired = true;

})