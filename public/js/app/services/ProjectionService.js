myApp.factory('ProjectionService', function($http) {
    var projections = [];
    var editMovie = {}
    return {
        getProjections: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/api/projections')
                    .then(function(response) {
                        // necessery actions before the resolve
                        console.log(response);
                        projections = response.data;
                        resolve(projections);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        }
    }
})