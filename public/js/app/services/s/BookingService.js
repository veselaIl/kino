app.factory('BookingService', function ($http){
    
    function getBookingTicket(kinoID, zalaID, movieID, time){
        console.log("movieId:", movieId);
        return new Promise(function (resolve, reject){
            $http.get('/api/book/'+ kinoID +'/'+ zalaID + '/' + movieID + '/' + time)
                .then(function (response){
                    console.log('getBookingTicket', response.data);
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