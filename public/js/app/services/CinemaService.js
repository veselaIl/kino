myApp.factory('CinemaService', function($http) {
    var cinemas = [];
    var editMovie = {}
    return {
        getCinemas: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/admin/cinema')
                //$http.get('/api/products')
                    .then(function(response) {
                        // necessery actions before the resolve
                        cinemas = response.data;
                        // console.log(movies);
                        resolve(cinemas);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        }
    }
});