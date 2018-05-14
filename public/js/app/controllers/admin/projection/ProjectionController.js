
myApp.controller('ProjectionController', function($scope, ProjectionService, MovieService, CinemaService){

  $scope.cinemas = [];
  $scope.movies = [];
  $scope.kino = {};
  $scope.hourList = [];
  $scope.projections = [];
  $scope.types = [
    { value : '1', name : 'Стандартен'},
    { value : '2', name : 'Промоционален'},
    { value : '3', name : 'Премиерен'}
  ]

  $scope.hours = [
    '10:00',
    '13:00',
    '15:45',
    '18:15',
    '21:00'
  ]
  
  $scope.initTypeValue = $scope.types[0].value;

  // Get all projections
  ProjectionService.getProjections()
    .then(function(projections){
      console.log('then', projections);
      $scope.$apply(function() {
          $scope.projections = projections;
      });
    })
    .catch(function(err){
      console.log(err);
    })

  //Get All movies  
  MovieService.getMovies()
  .then(function(movies){
    $scope.movies = movies;
    $scope.$apply();
  })
  .catch(function(err){
    console.log(err);
  })   

  //get Cinemas
  CinemaService.getCinemas()
    .then(function(cinemas){
      $scope.cinemas = cinemas;
      $scope.$apply();
    })
    .catch(function(err){
      console.log(err);
    })  


  function isBeetween(currentStart, currentEnd, start, end) {
    return currentStart >= start && currentEnd <= end
  }


  $scope.$watch('projection.kinoID', function(newValue, oldValue) {
    $scope.kino = $scope.cinemas[newValue];        
  }); 
  $scope.$watch('hours', function(newValue, oldValue) {
      // console.log(newValue);
  });

 

  $scope.validate = function(input){
    var movieNames = $scope.movies.map(movie => movie.name);
    if(movieNames.indexOf(input) === -1){
      $scope.message = "Невалиден филм"
    }else{
      $scope.message = '';
    }
    
  }

  $scope.isChecked = function(check){
    if(check.some(item => item === true)){
        $scope.message1 = '';
    }else{
      $scope.message1 = 'Поне един час трябва да е избран'
    }
  }

  $scope.addProjection = function($event, invalid){
    $event.preventDefault();
    if(!invalid){
      $scope.projection.hours = $scope.hourList;
      $scope.projection.startDate = $scope.startDate;
      $scope.projection.endDate = $scope.endDate;
      $scope.projection.hours = $scope.hourList;        
      CinemaService.getProjections($scope.projection.kinoID).then(function(cinema){
        $scope.cinema = cinema[0];
        $scope.$apply();
      });
      var cinemaProjections = $scope.projections.filter(projection => projection.kinoID === +$scope.projection.kinoID &&
                                                                      projection.zalaID === +$scope.projection.zalaID);;
      var projects = cinemaProjections.find(projection => isBeetween($scope.projection.startDate, $scope.projection.endDate, projection.startDate, projection.endDate));
      ProjectionService.addProjection($scope.projection).then(function(response){
        window.location.href = '/admin.html#!/projections';
      })
    }
  }
  moment().format('MMMM Do YYYY');
  $scope.projectionDates;
  $scope.$watch('projectionDates', function(newValue, oldValue){
    if(newValue){
        console.log('my array changed, new size : ' + newValue.length);
        console.log($scope.projectionDates);
        $scope.projects= $scope.projectionDates.map(item => item._d);

    }
}, true);  
   $scope.daysAllowed = [moment().date]

})