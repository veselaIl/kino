myApp.controller('AddCinemaController', function($scope, CinemaService){
    $scope.rows = [];
    $scope.numRows = 0;
    $scope.row = {}
    $scope.spaces = [];
    $scope.capacity = 

    $scope.$watch('numRows', function(newValue, oldValue){
        $scope.numRows = newValue;
        $scope.rows = new Array(newValue).fill().map( (v,i)  => i );
    });

    function isBelowThreshold(currentValue) {
        return currentValue < 21 && currentValue > 0;
    }

    $scope.addZala = function(){
        var some = $scope.rows.every(isBelowThreshold);
        if(some){
            $scope.spaces.push($scope.rows);
            $scope.numRows = 0;            
            $(".collapse").collapse('toggle');
        }
    }
    $scope.getCapacity = function(zala){
        var capacity = 0;
        for (var i = 0; i < zala.length; i++){
            capacity += zala[i]; 
        }
        return capacity;
    }

});