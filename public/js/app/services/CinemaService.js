myApp.factory('CinemaService', function($http) {
    var cinemas = [],
        cinema = {};
    var editMovie = {}
    return {
        getCinemas: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/admin/cinema')
                    .then(function(response) {
                        // necessery actions before the resolve
                        cinemas = response.data;
                        resolve(cinemas);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },
        cinema: function(cinema){
            return new Promise(function(resolve, reject){
                $http.post('/admin/cinema/add')
                    .then(function(response){
                        cinema = response.data;
                        console.log(cinema);
                    })
            })
        }
    }
});