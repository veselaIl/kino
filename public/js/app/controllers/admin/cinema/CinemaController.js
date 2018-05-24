myApp.controller('CinemaController', function($scope, CinemaService, ProjectionService){
    $scope.title='Кина';
    $scope.newMovie = {};
    $scope.cinemas = [];

    //get cinemas
    CinemaService.getCinemas()
        .then(function (cinemas){
            console.log('then', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

    //get projections
    ProjectionService.getProjections()
        .then(function (projections){
            $scope.projections = projections;
            $scope.projections.sort((a, b) => a.time - b.time);
            $scope.projections.forEach(function (projection) {
              return projection.time = moment(new Date(projection.time * 1000)).format('MMMM Do YYYY HH:mm');
            });
            console.log(projections, 'data');
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })
    
        $scope.vm = {};
        $scope.vm.titleBox="Изтриване на зала"
        $scope.vm.message = "Сигурен ли сте? ";
        $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
        $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
        $scope.vm.onConfirm = function(zala, kinoID){
          console.log(zala);
          console.log($scope);
        CinemaService.removeZala(zala.zalaID, kinoID)
          .then(function(response){
            if(response.status === 200){
              var index = $scope.cinemas.findIndex(cinema => cinema.kinoID === kinoID);
              var zalaIndex = $scope.cinemas[index].zali.findIndex(item => item.zalaID === zala.zalaID);
              $scope.cinemas[index].zali.splice(zalaIndex, 1);
              $scope.$apply();
              console.log($scope.filteredProjections);
            }
          })
        }    
})