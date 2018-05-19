
myApp.controller('ProjectionController', function($scope, $document, $routeParams, ProjectionService, MovieService, CinemaService){

  $scope.cinemas = [];
  $scope.movies = [];
  $scope.kino = {};
  $scope.check = [];
  $scope.type = [];
  $scope.time = [];
  $scope.hourList = [];
  $scope.projection = {};
  $scope.projectionDate = [];
  $scope.today = moment();
  $scope.pageSize = 10 ;
  $scope.currentPage = 1;

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
  
  ProjectionService.getProjects()
    .then(function(projects){
       $scope.$apply(function() { 
        $scope.allProjections = projects;
        $scope.allProjections.forEach(function(projection){
          return projection.time = moment(new Date(projection.time * 1000)).format('MMMM Do YYYY HH:mm');
        });
      })
  });

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
  //get projection 
  ProjectionService.getProjection($routeParams.id)
    .then(function(projection){
      $scope.projectionDetails = projection.projection;
      $scope.$apply();
      MovieService.getMovieByName($scope.projectionDetails.movie)
        .then(function(data){
          $scope.movie = data.movie;
          $scope.$apply();
          console.log($scope.movie, 'film');
        })
        .catch(function(err){
          console.log(err);
        })
     
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

  $scope.validate = function(input){
    var movieNames = $scope.movies.map(movie => movie.name);
    if(movieNames.indexOf(input) === -1){
      $scope.message = "Невалиден филм"
    }else{
      $scope.message = '';
    }    
  }
  //Добави прожекция
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
    var cinemaProjections = $scope.projections.filter(projection => projection.kinoID === +$scope.projection.kinoID &&
      projection.zalaID === +$scope.projection.zalaID);
    var current = {},
        final = [],
        time;
    console.log(list);//get dates and add hours
    projects.forEach(function(el,index){
      list[index].forEach(function(item){
          current = {
            type : $scope.types.model[index],
            time : new Date( el + ' ' + $scope.hours[parseInt(item)]).getTime()/1000,
            mesta : [],
            zalaID : $scope.projection.zalaID,
            kinoId: $scope.projection.kinoID,
            movie: $scope.projection.movie
          }
          final.push(current);
          console.log(final,'final'); 
      });
    })
    $scope.projection.projections = final;
    if(!invalid){   
      ProjectionService.addProjections(final).then(function(response){
        window.location.href = '/admin.html#!/projections';
      });
      CinemaService.getProjections($scope.projection.kinoID).then(function(cinema){
        $scope.cinema = cinema[0];
        $scope.$apply();
      });
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
