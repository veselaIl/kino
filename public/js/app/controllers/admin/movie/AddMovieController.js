myApp.controller('AddMovieController', function($scope, fileReader, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movie = {};
    $scope.movie.actors = [];
    $scope.genreList = {};
    $scope.imageSrc = '';
    

    // MovieService.getMovies()
    //     .then(function(movies){
    //         console.log('then', movies);
    //         $scope.movies = movies;
    //         $scope.$apply();
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     })

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
   
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });   

    // ADD MOVIE
    $scope.addMovie = function($event, invalid){
        $event.preventDefault();

        if(!invalid){
            $scope.movie.premierDate = $scope.dt.toLocaleDateString();
            console.log($scope);
            MovieService.addMovie($scope.movie);
            window.location.href='/admin.html#!/movies'
        }
    }

   // console.log($scope.action);
        
})