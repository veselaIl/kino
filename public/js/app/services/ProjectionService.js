myApp.factory('ProjectionService', function($http) {
    var projections = [];
    var editMovie = {}
    return {
        getProjections: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/admin/projections')
                //$http.get('/api/products')
                    .then(function(response) {
                        // necessery actions before the resolve
                        projections = response.data;
                        // console.log(movies);
                        resolve(movies);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        }
    }
})