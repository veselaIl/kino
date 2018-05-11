myApp.controller('AddMovieController', function($scope, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movies = [];
    $scope.genreList = {};
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
   
    $scope.addMovie = function(){
        $scope.datepicker = datepicker.date;
       // console.log('addMovie',movie);
       // if($scope.movie.name){
            console.log($scope);
            
           // MovieService.addMovie(movie);
        }
    
   
   // console.log($scope.action);
        
})