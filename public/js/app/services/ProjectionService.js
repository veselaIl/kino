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
        getProjects: function(){
            return new Promise(function(resolve, reject){
                $http.get('/api/projects')
                    .then(function(response){
                        projects = response.data;
                        resolve(projects);
                    })
                    .catch(function(err){
                        reject(err);
                    });
            })
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
        },
        addProjections: function(projections){
            return new Promise(function(resolve, reject){
                $http.post('/api/projections/add', { projections : projections})
                    .then(function(response){
                        console.log(response);
                        projections = response.data;
                        resolve(projections);
                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
        },
        getProjection : function(id){
            return new Promise(function(resolve, reject){
                console.log(id);
                $http.get('/api/projections/' + id  )
                    .then(function(response){
                        console.log(response)
                        projection = response.data;
                        resolve(projection);
                    })
                    .catch(function(err){
                        reject(err);
                    })
            })
        }
    }
})