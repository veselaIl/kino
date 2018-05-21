myApp.controller('MovieController', function($scope, $routeParams, MovieService){
    $scope.movies = [];
    $scope.movie = {};

    MovieService.getMovies()
        .then(function(movies){
            // console.log('then', movies);
            $scope.movies = movies;
            $scope.movie = movies.find(movie => movie.movieID === +$routeParams.id);
            $scope.$apply();
            
        })
        .catch(function(err){
            console.log(err);
        })
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
        $scope.checkSelected = function(){
            if($scope.movie.genres === 0){
                return false;
            }
            return true;
        }    
       console.log($scope);
})