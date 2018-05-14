myApp.factory('CinemaService', function($http) {
    var cinemas = [],
        editMovie = {},
        cinema = {};
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
        addCinema: function(cinema){
            return new Promise(function(resolve, reject) {
                $http.post('/api/cinema/add', { cinema: cinema })
                    .then(function(response) {
                        // necessery actions before the resolve
                        cinema.kinoID = response.data.id;
                        console.log('response', response.data);
                        console.log('user', cinema);
                        cinemas.push(cinema);
                        resolve();
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },
        getProjections: function(id){
            return new Promise(function(resolve, reject){
                console.log(id);
                $http.get('/api/cinema/projections/'+id)
                .then(function(response){
                    console.log(response);
                    cinema = response.data.cinema;
                    resolve(cinema);
                })
                .catch(function(err){
                    reject(err);
                })
            })
        }
    }
});