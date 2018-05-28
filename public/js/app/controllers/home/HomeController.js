app.controller('HomeController', function($scope, $routeParams, MovieService){   

    //Get all movies 
    MovieService.getMovies()
        .then(function (movies){            
            console.log('Home Controller: movies', movies);
            $scope.movies = movies;
            $scope.$apply();
        })
        .catch(function (err){
            errors.push(err);
        })

    console.log('$routeParams.id', $routeParams);
       
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

    
});