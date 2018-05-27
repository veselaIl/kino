myApp.controller('AddCinemaController', function($scope, $location, CinemaService){
    $scope.rows = [];
    $scope.row = {}
    $scope.spaces = [];
    $scope.zalaID = 0;
    $scope.cinema = {};
    $scope.coordinates = [];
    
    $scope.$watch('numRows', function (newValue, oldValue){
        $scope.numRows = newValue;
        $scope.rows = new Array(newValue).fill().map( (v,i)  => '' );
    });
    //upload cinema image
    $scope.fileNameChanged = function (ele) {
        console.log(ele.files[0]);
        if(ele.files[0]){
            $scope.cinema.image = ele.files[0].name;
            $scope.$apply();
        }
    }

    function isBelowThreshold(currentValue) {
        return currentValue < 21 && currentValue > 0 && currentValue !== undefined
    }
   
    $scope.addZala = function (notValid){
        var some = $scope.rows.every(isBelowThreshold);
        if (some && $scope.rows.length && !notValid){
            var mesta = 0;
            $scope.rows.forEach(element => {
                return mesta += element;
            });
            $scope.spaces.push({
                zalaID : ++$scope.zalaID,
                space : $scope.rows,
                capacity : mesta
            })
            $scope.disabled === true;
            $(".collapse").collapse('toggle');
        }
    }

    $scope.removeZala = function (index){
         $scope.spaces.splice(index, 1);
    }
    
    //add cinema
    $scope.addCinema= function ($event, form){
        $event.preventDefault();
        console.log(form);
        if (!form.invalid){
            $scope.cinema.zali = $scope.spaces;
            if($scope.cinema.name && $scope.cinema.address && $scope.cinema.zali.length){
                $scope.cinema.name = $scope.cinema.name.trim();
                $scope.cinema.address = $scope.cinema.address.trim();
                $scope.cinema.coordinates.lon =  $scope.cinema.coordinates.lon.trim();
                $scope.cinema.coordinates.lan =  $scope.cinema.coordinates.lan.trim();
                console.log($scope.cinema);
                CinemaService.addCinema($scope.cinema);
                $location.path('/admin/cinema');
            }
        }
        
      
        
    }
});