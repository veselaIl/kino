
myApp.controller('ProjectionController', function($scope, $document, ProjectionService, MovieService, CinemaService){

  $scope.cinemas = [];
  $scope.movies = [];
  $scope.kino = {};
  $scope.check = [];
  $scope.type = [];
  $scope.time = [];
  $scope.hourList = [];
  $scope.projection = {};
  $scope.projectionDate = [];
  
  $scope.types = {
    model: [],
    availableOptions: [
      { value : '1', name : 'Стандартен'},
      { value : '2', name : 'Промоционален'},
      { value : '3', name : 'Премиерен'}
    ]
   };
  // $scope.types = [
  //   { value : '1', name : 'Стандартен'},
  //   { value : '2', name : 'Промоционален'},
  //   { value : '3', name : 'Премиерен'}
  // ]

  $scope.hours = [
    '10:00',
    '13:00',
    '15:45',
    '18:15',
    '21:00'
  ]
  $scope.filterCondition={
    value: '1'
}

  $scope.types.config = $scope.types.availableOptions[0].value;

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

  $scope.addProjection = function($event, invalid){
    $event.preventDefault();
    var projects = $scope.projects.map(project => moment(project).format('MM DD YYYY')),
        list = [],
        hour = [],
        times = [];

    $scope.hourList.forEach(function(element) {
      for(var propName in element) {     
        if(element.hasOwnProperty(propName)) {
          var propValue = element[propName];
          if (propValue === true) {
            hour.push(propName);
          }
        }
      }
      list.push(hour);
      hour = [];
    })
    console.log(list);
    var current = {},
        final = [];
    //get dates and add hours
    projects.forEach(function(el,index){
      current = {};
      times = [];
      current.times = [];
      current.type = $scope.types.model[index];
      // console.log(list);     
      list[index].forEach(function(item){  
        console.log(item);      
        times.push(new Date( el + ' ' + $scope.hours[parseInt(item)]).getTime()/1000);
        current.times = times;
        current.mesta = [];
      }); 
      final.push(current); 
    }); 
    console.log(final);



    if(!invalid){
      ProjectionService.addProjections(final);
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
  $scope.$watch('projectionDates', function(newValue, oldValue){
    if(newValue){
        console.log('my array changed, new size : ' + newValue.length);
        console.log($scope.projectionDates);
        $scope.projects= $scope.projectionDates.map(item => item._d);
    }
}, true);  
$scope.selected = function(){
  console.log($scope.initTypeValue)
}
   $scope.daysAllowed = [moment().date]
})