app.controller('HomeController', function($scope, $routeParams, $document, MovieService, CinemaService){   

    //Get all movies 
    MovieService.getMovies()
        .then(function (movies){            
            console.log('Home Controller: movies', movies);
            $scope.movies = movies;
            $scope.filter = $scope.movies;   
            $scope.$apply();
        })
        .catch(function (err){
            errors.push(err);
        })
       
    console.log('$routeParams.id', $routeParams);
<<<<<<< HEAD
    //Get current movie
    MovieService.getMovie($routeParams.id)
       .then(function (movie){
            $scope.movie = movie;
            console.log('$scope.movie', $scope.movie);
            // console.log("Genre: ", movie.genre);
            // $scope.movie.genre = movie.genre;
            console.log('Actors:', movie.actors);
            
            // $scope.actor = movie.actors.forEach(a => {
            //     console.log("Actor: ", a.name);
            //     return a.name;
            // });
            $scope.$apply();
       })
       .catch(function (err){
            errors.push(err);
       })
    CinemaService.getCinemas()
    .then(function (cinemas){
        if (cinemas){
            $scope.cinemas = cinemas;
            $scope.$apply();
        }
    })   
    $scope.selectedCinemas = [];
=======
       
>>>>>>> 340e0ab4a99d1ae31cd662bba84029bdc50ba197
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

    $scope.toggleType = function(cinema, event, index) { 
        var customClass = '.type' + index;
        console.log(cinema);
        if($scope.isSelected(cinema)) {
            angular.element(document.querySelector(customClass)).removeClass('activeCinema');
            $scope.selectedCinemas.splice($scope.selectedCinemas.indexOf(cinema), 1);
        } else {
            angular.element(document.querySelector(customClass)).addClass('activeCinema');
            $scope.selectedCinemas.push(cinema);
        }
    }
    $scope.isSelected = function(cinema) {
        return $scope.selectedCinemas.indexOf(cinema) > -1;
    }

    
    
   

    
    
});
