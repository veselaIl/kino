myApp.controller('AddCinemaController', function($scope, CinemaService){
    $scope.rows = [];
    $scope.numRows = 0;
    $scope.row = {}
    $scope.spaces = [];
    $scope.zalaID = 0;
    $scope.cinema = {};
    
    $scope.$watch('numRows', function (newValue, oldValue){
        $scope.numRows = newValue;
        $scope.rows = new Array(newValue).fill().map( (v,i)  => '' );
    });

    function isBelowThreshold(currentValue) {
        return currentValue < 21 && currentValue > 0 && currentValue !== undefined
    }
   
    $scope.addZala = function (notValid){
        var some = $scope.rows.every(isBelowThreshold);
        if (some && $scope.rows.length && !notValid){
            var mesta = 0
            $scope.rows.forEach(element => {
                return mesta += element;
            });
            $scope.spaces.push({
                zalaID : ++$scope.zalaID,
                space : $scope.rows,
                capacity : mesta
            })
            $scope.disabled === true;
            $scope.numRows = 0;            
            $(".collapse").collapse('toggle');
        }
    }

    $scope.removeZala = function (index){
         $scope.spaces.splice(index, 1);
    }

    //add cinema
    $scope.addCinema= function ($event){
        $event.preventDefault();
        $scope.cinema.zali = $scope.spaces;
        if($scope.cinema.name && $scope.cinema.address && $scope.cinema.zali.length){
            $scope.cinema.name = $scope.cinema.name.trim();
            $scope.cinema.address = $scope.cinema.address.trim();
            CinemaService.addCinema($scope.cinema);
            window.location.href='/admin.html#!/cinema'
        }
       
      
        
    }
});