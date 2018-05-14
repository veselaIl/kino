
myApp.controller('ProjectionController', function($scope, ProjectionService, MovieService, CinemaService){

    $scope.title = 'Прожекции';
    $scope.cinemas = [];
    $scope.movies = [];
    $scope.kino = {};
    $scope.hourList = [];
    // $scope.projection = {};
    // $scope.projection.startDate = '';
    // $scope.projection.endDate = ''


    function isBeetween(currentStart, currentEnd, start, end) {
      return currentStart >= start && currentEnd <= end
    }
 

    ProjectionService.getProjections()
      .then(function(projections){
        $scope.projections = projections.projections;
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
      $scope.kino = $scope.cinemas[newValue];        
    }); 
    $scope.$watch('hours', function(newValue, oldValue) {
        console.log(newValue);
    });

    $scope.hours = [
        '10:00',
        '13:00',
        '15:45',
        '18:15',
        '21:00'
    ]
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
        console.log(cinemaProjections);
        var projects = cinemaProjections.find(projection => isBeetween($scope.projection.startDate, $scope.projection.endDate, projection.startDate, projection.endDate));
        }   

    }

    $(function() {
      $('input[name="daterange"]').daterangepicker({
        opens: 'left'
      }, function(start, end, label) {
        // console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        $scope.startDate = start.format('YYYY-MM-DD');
        $scope.endDate = end.format('YYYY-MM-DD');
      });
    });
    

})