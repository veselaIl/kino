app.factory('CinemaService', function ($http){
    var cinemas = [];
    var cinema = {};
    var message = {};

    function getCinemas(){
        return new Promise(function (resolve, reject){
            $http.get('/api/cinemas')
                .then(function (response){
                    console.log('CinemaService All Cinemas Response: ', response);
                    cinemas = response.data;
                    resolve(cinemas);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function getCinema(id){
        //console.log('CinemaService getCinema(id): ', id);
        return new Promise(function (resolve, reject){
            $http.get('/api/cinemas/view-cinema/' + id)
            .then(function (response){
                console.log('CinemaService Response ', response);
                console.log('CinemaService ResponseData ', response.data);
                cinema = response.data.cinema;
                resolve(cinema);
            })
            .catch(function (err){
                reject(err);
            });
        });
       
    }

    function sendMessage(message){
        return new Promise(function (resolve, reject){
            $http.post('/api/contacts-form', { message : message })
                .then(function (response){
                    console.log('sendMessage', response);
                    resolve(response);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }
    return {
        getCinemas: getCinemas,
        getCinema: getCinema,
        sendMessage: sendMessage
    }
})