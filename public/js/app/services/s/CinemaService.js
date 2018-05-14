app.factory('CinemaService', function ($http){
    var cinemas = [];

    function getCinemas(){
        return new Promise(function (resolve, reject){
            $http.get('/cinemas')
                .then(function (response){
                    console.log('CinemaService Response: ', response);
                    cinemas = response.data;
                    resolve(cinemas);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    return {
        getCinemas: getCinemas
    }
})