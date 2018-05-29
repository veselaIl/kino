app.controller('BookProjectionController', ['$scope', '$rootScope' ,'$routeParams', 'BookingService', function($scope, $rootScope, $routeParams, BookingService){
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
    }

    $scope.movieTypes = [
        '2D',
        '3D',
        'IMAX',
        '4DX'
    ]

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
    function showBookingPage(id){
        BookingService.getBookingTicket(id)
            .then(function (data){
                console.log(data,'booking details')
                $scope.bookingDetails = data;
                $scope.$apply();
                // console.log('showBookingPage data', data);
            })
            .catch(function (err){
                console.log(err);
            });
    }
    showBookingPage($routeParams._id);
    moment.locale("bg");
}])