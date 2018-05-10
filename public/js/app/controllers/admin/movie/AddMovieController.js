myApp.controller('AddMovieController', function($scope, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movies = [];

    MovieService.getMovies()
        .then(function(movies){
            console.log('then', movies);
            $scope.movies = movies;
            $scope.$apply();
        })
        .catch(function(err){
            console.log(err);
        })
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
    ] 
    console.log($scope);
    console.log($scope.action);
        
})