app.controller('BookingController', function ($scope, $routeParams, BookingService){

    $scope.projections = {};
    
    BookingService.getBookingTicket($routeParams.id)
        .then(function (projections){
            console.log("BookingController: ", projections);
            $scope.projections = projections;
            $scope.$apply();
        })
});