myApp.controller('ProjectionController', function ($scope, $document, $location, $routeParams, ProjectionService, MovieService, CinemaService) {

  $scope.cinemas = [];
  $scope.movies = [];
  $scope.kino = {};
  $scope.hourList = [];
  $scope.projection = {};
  $scope.projection.projections = [];
  // $scope.projection = {};;
  $scope.today = moment();
  $scope.pageSize = 10;
  $scope.currentPage = 1;
  $scope.prices = [12, 8, 15];
  $scope.projects = [];
  $scope.getNumber = function (num) {
    return new Array(num);
  }
  $scope.types = {
    model: [],
    availableOptions: [
      { value: '1', name: 'Стандартен' },
      { value: '2', name: 'Промоционален' },
      { value: '3', name: 'Премиерен' }
    ]
  };

  $scope.hours = [
    '10:00',
    '13:00',
    '15:45',
    '18:15',
    '21:00'
  ]

  $scope.movieTypes = [
    '2D',
    '3D',
    'IMAX',
    '4DX'
  ]

  $scope.filterCondition = {
    value: '1'
  }
  $scope.types.config = $scope.types.availableOptions[0].value;

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }  
  // Get all projections
  ProjectionService.getProjections()
    .then(function (projections) {
      console.log('then', projections);
      $scope.$apply(function () {
        $scope.projections = projections;
        $scope.projects = $scope.projections.projections;
        $scope.projects.forEach(function (projection){
          var count = 0; 
          for (var i = 0; i < projection.mesta.length; i++){
            for (var j = 0; j < projection.mesta[i].length; j++){
              if(projection.mesta[i][j] === 1){
                count++;
              }
            }
          }
          projection['count'] = count;
        })
      });
    })
    .catch(function (err) {
      console.log(err);
    })
  //get Cinemas
  CinemaService.getCinemas()
    .then(function (cinemas) {
      $scope.cinemas = cinemas;
      $scope.$apply();
    })
    .catch(function (err) {
      console.log(err);
    })
  //get movies
  MovieService.getMovies()
    .then(function (movies){
      $scope.movies = movies;
      $scope.$apply();
    })
  //get projection 
  if($routeParams.id){
    ProjectionService.getProjection($routeParams.id)
    .then(function (projection) {
      console.log(projection);
      $scope.projection = projection;
      $scope.$apply();
    })
  }
 
  
  function isBeetween(currentStart, currentEnd, start, end) {
    return currentStart >= start && currentEnd <= end
  }
  // ADD PROJECTION WATCHER FOR CINEMA 
  $scope.$watch('projection.kinoID', function (newValue, oldValue) {
    $scope.kino = $scope.cinemas.find(cinema => cinema.kinoID == newValue);
  });
  
  // ADD Projections validation
  $scope.validate = function (input) {
    var movieNames = $scope.movies.map(movie => movie.name);
    if (movieNames.indexOf(input) === -1) {
      $scope.message = "Невалиден филм"
    } else {
      $scope.message = '';
    }
  }
  //ADD PROJECTION
  $scope.addProjection = function ($event, invalid) {
    $event.preventDefault();
    var list = [],
        hour = [],
        current = {};
    $scope.hourList.forEach(function (element) {
      for (var propName in element) {
        if (element.hasOwnProperty(propName)) {
          var propValue = element[propName];
          if (propValue === true) {
            hour.push(propName);
          }
        }
      }
      list.push(hour);
      hour = [];
    });
    $scope.projects.forEach(function (el, index) {
      list[index].forEach(function (item) {
        var movie = $scope.movies.find(movie => movie.name === $scope.projection.movie);
        //get index of choosen zala to make a copy
        var zalaSpace = $scope.kino.zali.findIndex(zala => zala.zalaID == +$scope.projection.zalaID);
        var zala = $scope.kino.zali[zalaSpace].space.slice();
        zala.forEach(function (item, index){
          var row = [];
          for ( var i = 0; i < item; i++){
            row.push(0);
          }         
          zala[index] = row;
        }) 
        current = {
          type: $scope.types.model[index],
          time: new Date(moment(el).format('MM DD YYYY') + ' ' + $scope.hours[+item]).getTime() / 1000,
          mesta: zala,
          zalaID: +$scope.projection.zalaID,
          kinoID: +$scope.projection.kinoID,
          movieID: movie.movieID,
          movieType: $scope.projection.movieType
        }
        $scope.projection.projections.push(current);
      });
    })
    if (!invalid) {
      ProjectionService.addProjections($scope.projection.projections)
      $location.path('/admin/projections');
    }
     
  } 

  // Projection Dates to be added
  $scope.$watch('projectionDates', function (newValue, oldValue) {
    if (newValue) {
      console.log('my array changed, new size : ' + newValue.length);
      console.log($scope.projectionDates);
      $scope.projects = $scope.projectionDates.map(item => item._d);
    }
  }, true);
  //Filter projections
  $scope.$watch('cinemaValue', function (newValue, oldValue) {
    var project;
    if ($scope.projections) {
      // console.log('CINEMAS', $scope.cinemas)
      if(newValue){
        $scope.projects = $scope.projections.projections.filter(projection => projection.kinoID == $scope.cinemas[newValue].kinoID);
      } else {
        $scope.projects = $scope.projections.projections;
      }
    }
  });
 
  //POP-UP delete projection
  $scope.vm = {};
  $scope.vm.titleBox="Изтриване на прожекция"
  $scope.vm.message = "Сигурни ли сте? ";
  $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
  $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
  $scope.vm.onConfirm = function(projection){
    ProjectionService.removeProjection(projection._id)
      .then(function(response){
        if(response.status === 200){
          var index = $scope.projections.projections.findIndex(element => element._id === projection._id);
          $scope.projections.projections.splice(index, 1);
          $scope.$apply();
        }
      })
    }

  $scope.daysAllowed = [moment().date]
})
