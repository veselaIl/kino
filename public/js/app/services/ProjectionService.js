myApp.factory('ProjectionService', function($http,) {
    var editMovie = {},
        projections = [];
    return {
        getProjections: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/api/projections')
                    .then(function(response) {
                        console.log(response);
                        projections = response.data;                        
                        resolve(projections);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },
        addProjection: function(projection){
            return new Promise(function(resolve, reject){
                $http.post('/api/projection/add', { projection : projection})
                    .then(function(response){
                        console.log(response);
                        projection = response.data;
                        resolve();
                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
        }
    }
})