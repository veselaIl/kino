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
        
    //DaTEpicker
    $scope.popup = {
    opened: false
    };

    $scope.open = function() {
        $scope.popup.opened = true;
    }

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
    $scope.dt = null;
    };

    $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2018, 12, 31),
    minDate: new Date(2017,1,1),
    startingDay: 1
    };


    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : new Date();
    };
    
    $scope.toggleMin();

    
    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.format = 'dd-MMMM-yyyy';
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
    {
        date: tomorrow,
        status: 'full'
    },
    {
        date: afterTomorrow,
        status: 'partially'
    }
    ];

    function getDayClass(data) {
    var date = data.date,
        mode = data.mode;
    if (mode === 'day') {
        var dayToCheck = new Date(date);

        for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date)

        if (dayToCheck === currentDay) {
            return $scope.events[i].status;
        }
        }
    }

    return '';
    }

    // ADD MOVIE
    $scope.addMovie = function($event, invalid){
        $event.preventDefault();

        if(!invalid){
            $scope.movie.premieDate = $scope.dt.toLocaleDateString();
            console.log($scope);
            MovieService.addMovie($scope.movie);
            window.location.href='/admin.html#!/movies'
        }
    }

   // console.log($scope.action);
        
})