app.controller('BookProjectionController', ['$scope', '$rootScope', 'BookingService', function($scope, $rootScope, $routeParams, BookingService){
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
    }
    $scope.counter = 0;
    $scope.priceReduced = 8;
    $scope.priceRegular = 12;
    $scope.priceStudent = 10;
    $scope.totalPrice = 0;
    $scope.decrement = function(){
        if($scope.counter > 0){
            $scope.counter--;
            switch($scope.price){
                case $scope.priceReduced : $scope.totalPrice -= $scope.priceReduced;
                case $scope.priceRegular : $scope.totalPrice -= $scope.priceRegular;
                case $scope.priceStudent : $scope.totalPrice -= $scope.priceStudent;
                default: $scope.TotalPrice = 0;
            }
        }
    }
    $scope.increment = function(){
        if($scope.counter < 6){
            $scope.counter++;
            switch(price){
                case $scope.priceReduced : $scope.totalPrice += $scope.priceReduced;
                case $scope.priceRegular : $scope.totalPrice += $scope.priceRegular;
                case $scope.priceStudent : $scope.totalPrice += $scope.priceStudent;
                default: $scope.TotalPrice = 0;
            }
        }
    }
    console.log('$routeParams', $routeParams);
    function showBookingPage(kinoID, zalaID, movieID, time){
        BookingService.getBookingTicket(kinoID, zalaID, movieID, time)
            .then(function (data){
                console.log('showBookingPage data', data);
            })
            .catch(function (err){
                console.log(err);
            });
    }

    moment.locale("bg");
}])