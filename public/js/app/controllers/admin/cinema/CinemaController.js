myApp.controller('CinemaController', function($scope, $routeParams, $location, CinemaService, ProjectionService){
    $scope.title='Кина';
    $scope.newMovie = {};
    $scope.cinemas = [];

    //get cinemas
    CinemaService.getCinemas()
        .then(function (cinemas){
            $scope.cinemas = cinemas;
            console.log($routeParams.kinoID,'params')
            if($routeParams.kinoID){
                console.log($routeParams);
                $scope.cinema = cinemas.find(cinema => cinema.kinoID === +$routeParams.kinoID);
                console.log($scope.cinema);
                $scope.zala = $scope.cinema.zali.find(zala => zala.zalaID === +$routeParams.zalaID);
            }
                    // console.log($scope.zala);
                                    // .find(zala => zalaID === +$routeParams.zalaID);
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })
    //get projections
    // ProjectionService.getProjections()
    //     .then(function (projections){
    //         $scope.projections = projections;
    //         $scope.$apply();
    //     })
    //     .catch(function (err){
    //         console.log(err);
    //     })
    
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
                $location.path('/admin/cinema');

            }
        } 
        $scope.editZala = function(event, form){
            event.preventDefault();
            if(!form.$invalid){
                var mesta = 0;
                $scope.zala.space.forEach(element => mesta += element);
                $scope.zala = {
                    capacity : mesta,
                    zalaID : $scope.zala.zalaID,
                    space : $scope.zala.space
                }
                CinemaService.editZala($scope.zala, $routeParams.kinoID)
                $location.path('/admin/cinema');
            }
        }
})