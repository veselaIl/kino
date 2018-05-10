myApp.factory('MovieService', function($http) {
    var movies = [];
    var editMovie = {}
    return {
        getMovies: function() {
            return new Promise(function(resolve, reject) {
                $http.get('/admin/movies')
                //$http.get('/api/products')
                    .then(function(response) {
                        // necessery actions before the resolve
                        movies = response.data;
                        // console.log(movies);
                        resolve(movies);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        },
        editMovies: function(movie){
            return new Promise(function(resolve, reject){
                $http.patch('/admin/movies/edit/'+movie.id, { data : movie})
                    .then(function(response){
                       editMovie = response.data;
                       resolve();
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            })
        },
        addMovie: function(movie){
            return new Promise(function(resolve, response){
                $http.push('/admin/movies/add', {data : movie})
                    .then(function(response){
                        movie.id = response.data.id;
                        movies.push(movie);
                        resolve(movies);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            })
        }
    }
});