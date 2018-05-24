myApp.factory('MovieService', function($http, $routeParams) {
    var movies = [],
        editMovie = {},
        movie = {};
        
    return {
        getMovies: function() {
            return new Promise(function (resolve, reject) {
                $http.get('/api/movies')
                //$http.get('/api/products')
                    .then(function (response) {
                        // necessery actions before the resolve
                        movies = response.data;
                        // console.log(movies);
                        resolve(movies);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            });
        },
        getMovie: function (id){
            return new Promise(function (resolve, reject){     
                $http.get('/api/movies/movie/' + id)
                    .then(function (response){
                        console.log(response);
                        resolve(response.data)
                    })
                    .catch(function (err){
                        console.log(err);
                    })
            })
        },
        getMovieByName : function (name){
            return new Promise(function (resolve, reject){
                console.log(name);
                $http.get('/api/movie/'+ name)
                    .then(function (response){
                        console.log(response, 'movie');
                        movie = response.data;
                        resolve(movie);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        },
        editMovie: function (movie){
            return new Promise(function (resolve, reject){
                $http.patch('/api/movies/edit/'+ movie.id, { data : movie})
                    .then(function (response){
                       editMovie = response.data;
                       resolve();
                    })
                    .catch(function (err){
                        console.log(err);
                    })
            })
        },
        addMovie: function (movie){
            return new Promise(function (resolve, response){
                $http.post('/api/movies/add', { movie : movie})
                    .then(function (response){
                        movie.id = response.data.id;
                        movies.push(movie);
                        resolve();
                    })
                    .catch(function (err){
                        console.log(err);
                    })
            })
        },
        // getMovie: function (id){
        //     return new Promise(function (resolve, response){
        //         $http.get('/admin/movies/edit/'+ movie.id)
        //             .then(function (response){
        //                 movie = response.data;
        //                 resolve();
        //             })
        //             .catch(function (err){
        //               console.log(err);
        //             })
        //     })
        // }
    }
});