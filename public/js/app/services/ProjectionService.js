myApp.factory('ProjectionService', function($http,) {
    var editMovie = {},
        projections = [];
        
    return {
        getProjections: function() {
            return new Promise(function (resolve, reject) {
                $http.get('/admin/api/projections')
                    .then(function (response) {
                        console.log(response);
                        projections = response.data;                        
                        resolve(projections);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        },
        getProjects: function(){
            return new Promise(function (resolve, reject){
                $http.get('/admin/api/projects')
                    .then(function (response){
                        projects = response.data;
                        resolve(projects);
                    })
                    .catch(function (err){
                        reject(err);
                    });
            })
        },
        addProjection: function (projection){
            return new Promise(function (resolve, reject){
                $http.post('/admin/api/projection/add', { projection : projection})
                    .then(function (response){
                        console.log(response);
                        projection = response.data;
                        resolve();
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        },
        addProjections: function (projections){
            return new Promise(function (resolve, reject){
                $http.post('/admin/api/projections/add', { projections : projections})
                    .then(function (response){
                        console.log(response);
                        projections = response.data;
                        resolve(projections);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        },
        getProjection : function (id){
            return new Promise(function (resolve, reject){
                console.log(id);
                $http.get('/admin/api/projections/' + id  )
                    .then(function (response){
                        console.log(response)
                        projection = response.data;
                        resolve(projection);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        },
        removeProjection: function(id){
            return new Promise(function (resolve, reject){
                console.log(id, 'PROJECTION TO DELETE ')
                $http.post('/admin/api/projections/delete/' + id )
                    .then(function (response){
                        console.log(response, 'DELETE PROJECTION RESPONSE')
                        resolve(response);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        }
    }
})