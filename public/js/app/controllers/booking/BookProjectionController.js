app.controller('BookProjectionController', ['$scope', '$rootScope', 'BookingService', function($scope, $rootScope, $routeParams, BookingService){
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];    
    $scope.setActive = function(day){
        $scope.activeDay = day;
        console.log($scope.activeDay);
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