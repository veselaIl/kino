myApp.controller('AddMovieController', function($scope,  $location, MovieService){
    $scope.title='Филми';
    $scope.newMovie = {};
    $scope.movie = {};
    var filter = [];
    $scope.genreList =[];
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
    
    $scope.suitable = [ 
        { value : '1', name:'12+'},
        { value: '2', name:'16+'},
        { value: '3', name: 'Без ограничения'}
    ]
    
    $scope.checkSelected = function(){
        if($scope.movie.genres === 0){
            return false;
        }
        return true;
    }
   
    $scope.fileNameChanged = function (ele) {
        $scope.movie.largeImage = ele.files[0].name;
        $scope.$apply();
    }

    $scope.fileNameChanged1 = function (ele) {
        $scope.movie.image = ele.files[0].name;
        $scope.$apply();
        
    }

     // ADD MOVIE
     $scope.addMovie = function ($event, invalid){
        $event.preventDefault();
        console.log($scope.genreList);
        if (!invalid){
            $scope.genreList.forEach(function (genre, index){
                if (genre === true){
                    filter.push($scope.genres[index]);
                }
            });    
            $scope.movie.genre = filter;
            filter = [];
            console.log($scope.movie, 'MOVIE BEFORE ADD')
            MovieService.addMovie($scope.movie);
            $location.path('/admin/movies');
        }
    }
   // console.log($scope.action);
        
})