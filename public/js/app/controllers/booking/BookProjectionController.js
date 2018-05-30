app.controller('BookProjectionController', ['$scope', '$rootScope' ,'$timeout','$routeParams', '$location', 'BookingService' , '$uibModal',function($scope, $rootScope, $timeout, $routeParams, $location, BookingService,  $uibModal){
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
    $scope.class = false;
    $scope.class1 = false;
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

    
    function showBookingPage(id){
        BookingService.getBookingTicket(id)
            .then(function (data){
                console.log(data,'booking details')
                $scope.bookingDetails = data;
                price = $scope.price[+$scope.bookingDetails.projection.type-1]; 
                $scope.bookingDetails['booking'] = $rootScope.reservation;
                $scope.$apply();
            })
            .catch(function (err){
                console.log(err);
            });
        }

    $rootScope.reservation = [];
    $scope.checkSelected = function(row,seat){
        if(!$rootScope.reservation.find(item => item.row === row && item.seat === seat)){
            $rootScope.reservation.push({ row,seat });
            $scope.totalPrice = $rootScope.reservation.length * price;
        } else {
            var index = $rootScope.reservation.findIndex(item => item.row === row && item.seat ===seat);
            $rootScope.reservation.splice(index, 1);
            $scope.totalPrice = $rootScope.reservation.length * price;
            
        }
        return $rootScope.reservation;
    }
    $scope.finishReservation = function(reservations, event){
       if (reservations.length) {
           var mesta = $scope.bookingDetails.projection.mesta;
            console.log(reservation, 'reservation')
           reservations.forEach(function (reservation){
               mesta[reservation.row][reservation.seat] = 1;
           });
            console.log( $scope.bookingDetails.projection.mesta);
           BookingService.book(mesta ,$scope.bookingDetails.projection._id);
       } else {
           event.preventDefault();
           $scope.message = "Трябва да маркирате поне едно място, за да направите резарвация.";
           
       }
    }
   
    if ($routeParams._id) {
        console.log($routeParams);
        showBookingPage($routeParams._id);
    } else {
        if($rootScope.user){
            console.log($routeParams)
            showBookingPage($routeParams.id);
        } else {
            $location.path('/login');
        }        
    }

        
    $scope.open = function(event) {
        if($scope.reservation.length === 0){
            $scope.message = "Трябва да маркирате поне едно място, за да направите резарвация.";
        } else{
            $scope.message ='';
            $scope.class = true;
            var modalContent = $uibModal.open({
                templateUrl: 'modal.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                bookingDetails: function() {
                    return $scope.bookingDetails;
                },
                reservation : function(){
                    return $rootScope.reservation;
                },
                totalPrice : function(){
                    return $scope.totalPrice;
                }   
                }
            })
        }
    }

    $scope.counter = 1200;
    $scope.onTimeout = function () {
    if ($scope.counter == 0) {
        alert('Сесията ви изтече');
        $location.path('/');
        $scope.counter = 0;
    }
    else{
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    }       
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);


    
  moment.locale("bg");
  //});//Uncomment
}]);

app.controller('ModalInstanceCtrl', function($uibModalInstance, BookingService, bookingDetails,totalPrice, reservation, $scope) {
    $scope.data = bookingDetails;
    $scope.reservations = reservation;
    $scope.totalPrice = totalPrice;
    console.log($scope);

    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');

    }
    $scope.ok = function(){
        $scope.class1 = true;
        var mesta = $scope.data.projection.mesta;
        $scope.reservations.forEach(function (reservation){
            mesta[reservation.row][reservation.seat] = 1;
           });
        BookingService.book(mesta ,$scope.data.projection._id, $scope.reservations)
                $uibModalInstance.close();
                $scope.message = 'Успешна резервация. До 5 секунди ще бъдете автоматично прехвърлени към начална страница.';
                setTimeout(function () {
                    // after 2 seconds
                    $location.path = "/";
                }, 5000)
    }
});

app.filter('secondsToDateTime', [function() {
    return function(seconds) {
 return new Date(1970, 0, 1).setSeconds(seconds);
}   


}]);
