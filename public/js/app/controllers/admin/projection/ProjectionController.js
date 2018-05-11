myApp.controller('ProjectionController', function($scope, ProjectionService, MovieService, CinemaService){

    $scope.title = 'Прожекции';
    $scope.projections = [];
    $scope.cinemas = [];
    $scope.movies = []
    $scope.kino = 0;
    $scope.zala = {}

    ProjectionService.getProjections()
      .then(function(projections){
        $scope.projections = projections;
        $scope.$apply();
      })
      .catch(function(err){
        console.log(err);
      })

    MovieService.getMovies()
      .then(function(movies){
        $scope.movies = movies;
        $scope.$apply();
      })
      .catch(function(err){
        console.log(err);
      })   
    
    CinemaService.getCinemas()
      .then(function(cinemas){
        $scope.cinemas = cinemas;
        $scope.$apply();
      })
      .catch(function(err){
        console.log(err);
      })
      $scope.$watch('projection.kinoID', function(newValue, oldValue) {
        $scope.kino = newValue;        
    }); 
    console.log($scope.kino);
    $scope.hours = [
        '10:15',
        '13:00',
        '15:45',
        '18:15',
        '21:00'
    ]

})