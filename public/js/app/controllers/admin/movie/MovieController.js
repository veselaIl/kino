myApp.controller('MovieController', function($scope, $routeParams, $location,  MovieService){
    $scope.movies = [];
    $scope.movie = {};
    var indexes = [];
    
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
    
    MovieService.getMovies()
        .then(function (movies){
            // console.log('then', movies);
            $scope.movies = movies;
            $scope.movie = movies.find(movie => movie.movieID === +$routeParams.id);
            $scope.$apply();
            
        })
        .catch(function(err){
            console.log(err);
        })

    $scope.checkSelected = function(){
        if($scope.movie.genres === 0){
            return false;
        }
        return true;
    }    

    $scope.editMovie = function (event, invalid){
        event.preventDefault();
     
    }

    $scope.delete = function (movieID){
        if(movieID){
            MovieService.removeMovie(movieID);
            $location.path('/admin/movies');
        }
    }
    console.log($scope);
})