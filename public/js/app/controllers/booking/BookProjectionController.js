app.controller('BookProjectionController', ['$scope', '$rootScope' ,'$routeParams', 'BookingService', function($scope, $rootScope, $routeParams, BookingService){
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
    }
    $scope.reserveSeat = [];
    $scope.movieTypes = [
        '2D',
        '3D',
        'IMAX',
        '4DX'
    ]
    var price;
    $scope.suitable = [ 
        { value : '1', name:'12+'},
        { value: '2', name:'16+'},
        { value: '3', name: 'Без ограничения'}
    ]
    $scope.price = [8, 10, 14]
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
                price = $scope.price[+$scope.bookingDetails.projection.type-1];    
                $scope.$apply();
            })
            .catch(function (err){
                console.log(err);
            });
    }
    var reservation = [];
    $scope.checkSelected = function(row,seat){
        if(!reservation.find(item => item.row === row && item.seat === seat)){
            reservation.push({row,seat});
            $scope.totalPrice = reservation.length * price;
        
        } else {
            var index = reservation.findIndex(item => item.row === row && item.seat ===seat);
            reservation.splice(index, 1);
            $scope.totalPrice = reservation.length * price;

        }
    }
    showBookingPage($routeParams._id);
    moment.locale("bg");
}])