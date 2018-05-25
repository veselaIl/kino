myApp.controller('CinemaController', function($scope, $routeParams,  CinemaService, ProjectionService){
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
        $scope.vm.message = "Сигурни ли сте? ";
        $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
        $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
        $scope.vm.onConfirm = function(zala, kinoID){
        CinemaService.removeZala(zala.zalaID, kinoID)
          .then(function(response){
            if(response.status === 200){
              var index = $scope.cinemas.findIndex(cinema => cinema.kinoID === kinoID);
              var zalaIndex = $scope.cinemas[index].zali.findIndex(item => item.zalaID === zala.zalaID);
              $scope.cinemas[index].zali.splice(zalaIndex, 1);
              $scope.$apply();
            }
          })
        }
        //custom popUP
        $scope.cm = {};
        $scope.cm.titleBox="Изтриване на кино"
        $scope.cm.message = "Сигурни ли сте, че искате да изтриете това кино? ";
        $scope.cm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
        $scope.cm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
        $scope.cm.onConfirm = function (kinoID){
        CinemaService.removeCinema(kinoID)
          .then(function(response){
            if(response.status === 200){
              var index = $scope.cinemas.findIndex(cinema => cinema.kinoID === kinoID);
              $scope.cinemas.splice(index, 1);
              $scope.$apply();
              console.log($scope.filteredProjections);
            }
          })
          .catch(function (err){
              console.log(err);
          })
        }   
        
        
        // ADD ZALA 
        $scope.$watch('numRows', function (newValue, oldValue){
            $scope.numRows = newValue;
            $scope.rows = new Array(newValue).fill().map( (v,i)  => '' );
        });

        $scope.addZala = function(event, form){
            event.preventDefault();
            console.log(form.$invalid);
            if(!form.$invalid){
                var mesta = 0;
                $scope.rows.forEach(element => {
                    return mesta += element;
                }); 
                $scope.zala = {
                    capacity : mesta,
                    space : $scope.rows
                }
                CinemaService.addZala($scope.zala, $routeParams.id);

            }
        }
})