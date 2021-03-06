app.controller('HomeController', function($scope, $routeParams, $document, MovieService, CinemaService){   
    //Get all movies 
    MovieService.getMovies()
        .then(function (movies){            
            // console.log('Home Controller: movies', movies);
            $scope.movies = movies;
            $scope.filter = $scope.movies; 
            $scope.$apply();
        })
        .catch(function (err){
            errors.push(err);
        })
    
    
    // console.log('$routeParams.id', $routeParams);

    CinemaService.getCinemas()
    .then(function (cinemas){
        if (cinemas){
            $scope.cinemas = cinemas;
            $scope.$apply();
        }
    })  
    $scope.selectedCinemas = [];
    $scope.title = "Филми";
    $scope.movies = [];
    $scope.movie = {};
    var errors = [];
    
    $scope.genres = [
        "Комедия",
        "Екшън",
        "Драма",
        "Анимация",
        "Криминален",
        "Романтичен",
        "Фентъзи",
        "Мюзикал",
        "Трилър",
        "Ужаси",
        "Биографичен",
        "Исторически",
        "Научно-популярен",
        "Технологичен",
        "Документален"
    ];

    $scope.movieTypes = [
        '2D',
        '3D',
        'IMAX',
        '4DX'
    ]
    //filter
    $scope.filmi = [];
    $scope.toggleCinema = function(cinema, event, index) { 
        var customClass = '.cine' + index;
        if ($scope.isSelected(cinema)) {
            angular.element(document.querySelector(customClass)).removeClass('activeCinema');
            $scope.selectedCinemas.splice($scope.selectedCinemas.indexOf(cinema), 1);
        } else {
            angular.element(document.querySelector(customClass)).addClass('activeCinema');
            $scope.selectedCinemas.push(cinema);
        }

        $scope.movies.filter(function (movie){
            if ($scope.selectedCinemas.length){
                $scope.selectedCinemas.forEach(function (selected){
                    if (movie.genre.indexOf(selected) !== -1){
                        if ($scope.filmi.findIndex(item => item.movieID === movie.movieID) === -1){
                            $scope.filmi.push(movie);
                        }
                    }
                })
            }
        })
        if (!$scope.selectedCinemas.length){
            $scope.filter = $scope.movies;
        } else {
            $scope.filter = $scope.filmi;
        }

       $scope.filmi = [];
    }

    $scope.isSelected = function(cinema) {
        return $scope.selectedCinemas.indexOf(cinema) > -1;
    }

    MovieService.getMovie($routeParams.id)
        .then(function (movie){
            // console.log(movie, 'movie');
            $scope.movie = movie;
            $scope.$apply();
        })
});
