myApp.controller('AddMovieController', function($scope,  $location, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movie = {};
    $scope.genreList = {};
    $scope.imageSrc = '';

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

     // ADD MOVIE
     $scope.addMovie = function ($event, invalid){
        $event.preventDefault();

        if (!invalid){
            console.log($scope);
            MovieService.addMovie($scope.movie);
            $location.path('/admin/movies');
        }
    }
   // console.log($scope.action);
        
})