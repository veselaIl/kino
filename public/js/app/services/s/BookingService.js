app.factory('BookingService', function ($http){
    
    function getBookingTicket(movieId){
        console.log("movieId:", movieId);
        return new Promise(function (resolve, reject){
            $http.get('/api/booking-ticket/' + movieId)
                .then(function (response){
                    resolve(response.data);
                })
                .catch(function(err){
                    reject(err);
                })
        })
    }

    return {
        getBookingTicket: getBookingTicket
    }
});