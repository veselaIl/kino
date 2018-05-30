app.factory('BookingService', function ($http){
    
    function getBookingTicket(id){
        console.log(id, 'Projection ID')
        return new Promise(function (resolve, reject){
            $http.get('/api/book/'+ id)
                .then(function (response){
                    resolve(response.data);
                })
                .catch(function(err){
                    reject(err);
                })
        })
    }
    function book(mesta, id, reservation){
        return new Promise(function (resolve, reject){
            $http.post('/api/book/projection/'+id, {mesta : mesta, reservation : reservation})
                .then(function (repsonse){
                   console.log(response);
                    // resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }
    return {
        getBookingTicket: getBookingTicket,
        book : book
    }
});