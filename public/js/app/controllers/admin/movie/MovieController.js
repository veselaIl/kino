myApp.controller('MovieController', function($scope, $routeParams, $location,  MovieService){
    $scope.movies = [];
    $scope.movie = {};
    var indexes = [];
    var genreIndexes = [];
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
            console.log(movies, 'movies');
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
    
    $scope.fileNameChanged = function (ele) {
        console.log(ele.files[0]);
        if(ele.file[0]){
            $scope.movie.image = ele.files[0].name;
            $scope.$apply();
        }
    }

    $scope.fileNameChanged1 = function (ele) {
        console.log(ele.files[0]);
        if(ele.files[0]){
            $scope.movie.largeImage = ele.files[0].name;
            $scope.$apply();
        }
    }

    $scope.editMovie = function (event, invalid){
        event.preventDefault();
        console.log($scope.movie);
        $scope.movie.genre.forEach(function (genre, index) {
            if (genre == true){
               $scope.movie.genre[index] = $scope.genres[index]
            }
        }) 
        if (!invalid){
          console.log($scope);
          MovieService.editMovie($scope.movie);
        //   $location.path('/admin/movies');
        }
            
        
    }
    
    $scope.checkSelected = function(){
        if($scope.movie.genres === 0){
            return false;
        }
        return true;
    }

    //POP-UP delete projection
    $scope.vm = {};
    $scope.vm.titleBox="Изтриване на филм"
    $scope.vm.message = `Сигурни ли сте, че искате да изтриете този филм? Изтривайки 
                        филма ще изтриете и всички прожекции свързани с него`;
    $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
    $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
    //delet movie and all projections to this movie    
    $scope.vm.onConfirm = function(movieID){
        console.log(movieID);
        if(movieID){
            MovieService.removeMovie(movieID);
            $location.path('/admin/movies');
        }
    }
})