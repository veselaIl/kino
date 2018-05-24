myApp.controller('ProjectionController', function ($scope, $document, $routeParams, ProjectionService, MovieService, CinemaService) {

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
  $scope.pageSize = 10;
  $scope.currentPage = 1;
  $scope.prices = [12, 8, 15];

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

  // Get all projections
  ProjectionService.getProjections()
    .then(function (projections) {
      console.log('then', projections);
      $scope.$apply(function () {
        $scope.projections = projections;
      });
    })
    .catch(function (err) {
      console.log(err);
    })
  
  //Get All movies  
  MovieService.getMovies()
    .then(function (movies) {
      $scope.movies = movies;
      $scope.$apply();
    })
    .catch(function (err) {
      console.log(err);
    })

  ProjectionService.getProjects()
    .then(function (projects) {
      $scope.$apply(function () {
        $scope.allProjections = projects;
        $scope.allProjections.sort((a, b) => a.time - b.time);
        $scope.allProjections.forEach(function (projection) {
          var film = $scope.movies.find(movie => movie.movieID === projection.movieID);
          projection.movieName = film.name;
          return projection.time = moment(new Date (projection.time * 1000)).format('DD MMMM YYYY / HH:mm');
        });
        $scope.allProjections = $scope.allProjections.filter(projection => projection.time > moment().format('DD MMMM YYYY / HH:mm'));
        $scope.filteredProjections = $scope.allProjections;
      })
    });

  //get Cinemas
  CinemaService.getCinemas()
    .then(function (cinemas) {
      $scope.cinemas = cinemas;
      $scope.$apply();
    })
    .catch(function (err) {
      console.log(err);
    })

  //get projection 
  ProjectionService.getProjection($routeParams.id)
    .then(function (projection) {
      projection.projection.time = moment(new Date(projection.projection.time * 1000)).format('DD MMMM YYYY HH:mm');
      $scope.projectionDetails = projection.projection;
      $scope.$apply();

      //get movies by names
      MovieService.getMovieByName($scope.projectionDetails.movie)
        .then(function (data) {
          $scope.movie = data.movie;
          $scope.$apply();
          console.log($scope.movie, 'film');
        })
        .catch(function (err) {
          console.log(err);
        })

      //get cinema
      CinemaService.getCinema($scope.projectionDetails)
        .then(function (data) {
          $scope.projectionCinema = data.cinema;
          $scope.$apply();
          console.log($scope.projectionCinema, 'kino');
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    })
  
  function isBeetween(currentStart, currentEnd, start, end) {
    return currentStart >= start && currentEnd <= end
  }
  // ADD PROJECTION WATCHER FOR CINEMA 
  $scope.$watch('projection.kinoID', function (newValue, oldValue) {
    console.log(newValue)
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
    var projects = $scope.projects.map(project => moment(project).format('MM DD YYYY')),
      list = [],
      hour = [],
      times = [],
      cinemaProjections = $scope.projections.filter(projection => projection.kinoID === +$scope.projection.kinoID &&
        projection.zalaID === +$scope.projection.zalaID),
      current = {},
      final = [],
      time;

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

    projects.forEach(function (el, index) {
      list[index].forEach(function (item) {
        //find choosen cinema
        var movie = $scope.movies.find(movie => movie.name === $scope.projection.movie);
        var cinema = $scope.cinemas.find(item => item.kinoID == $scope.projection.kinoID);
        //get index of choosen zala to make a copy
        var zalaSpace = cinema.zali.findIndex(zala => zala.zalaID == $scope.projection.zalaID);
        current = {
          type: $scope.types.model[index],
          time: new Date(el + ' ' + $scope.hours[parseInt(item)]).getTime() / 1000,
          mesta: cinema.zali[zalaSpace].space.slice(),
          zalaID: $scope.projection.zalaID,
          kinoID: $scope.projection.kinoID,
          movieID: movie.movieID,
          movieType: $scope.projection.movieType
        }
        final.push(current);
        console.log(final, 'final');
      });
    })

    $scope.projection.projections = final;
    if (!invalid) {
      // newProjections.push(project);
      CinemaService.addProjections(final, $scope.kino);
      ProjectionService.addProjections(final).then(function (response) {
        window.location.href = '/admin.html#!/projections';
      })
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
    if($scope.allProjections){
      $scope.filteredProjections = $scope.allProjections.filter(projection => projection.kinoID == newValue);
    }
    $scope.kino = $scope.cinemas.find(cinema => cinema.kinoID == newValue);
    // console.log(newValue);
    if(!newValue){
      $scope.filteredProjections = $scope.allProjections;
    }
    $scope.$watch('projection.zalaID', function (newValue, oldValue) {
      var filter = $scope.filteredProjections;
      console.log(newValue);
      if($scope.filteredProjections){
        $scope.filteredProjections = $scope.filter.filter(projection => projection.zalaID == newValue);
      }// console.log(filter);
      // $scope.filteredProjections = filter;
    });
  });
  

    $scope.vm = {};
    $scope.vm.titleBox="Изтриване на прожекция"
    $scope.vm.message = "Сигурен ли сте? ";
    $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
    $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
    $scope.vm.onConfirm = function(projection){
      console.log(projection);
    ProjectionService.removeProjection(projection._id)
      .then(function(response){
        if(response.status === 200){
          var index = $scope.filteredProjections.findIndex(element => element._id === projection._id);
          console.log($scope.filteredProjections);
          $scope.filteredProjections.splice(index, 1);
          $scope.$apply();
          console.log($scope.filteredProjections);
        }
      })
    }
    // confirm('Сигурен ли сте, че искате да изтиете прожекция', projection.movie - projection.time)
  
 
  
  
 
  console.log($scope);
  $scope.daysAllowed = [moment().date]
})
