app.factory('MovieService', function($http, $routeParams){
    var movies = [],
        movie = {};
    
    function getMovies (){
        return new Promise(function (resolve, reject){
            $http.get('/api/movies')
                .then(function (response) {
                    console.log('MovieService Response: ', response);
                    movies = response.data;
                    console.log('MovieService ResponseData: ', response.data);
                    resolve(movies);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    }

    function getCurrentMovie(id){
        return new Promise(function (resolve, reject){
            $http.get('/api/movies/preview-movie/' + id)
                .then(function (response){
                    movie = response.data;
                    resolve();
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }
    return{
        getMovies: getMovies
        //getMovie: getCurrentMovie
    }
})