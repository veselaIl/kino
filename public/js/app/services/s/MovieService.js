app.factory('MovieService', function($http){
    var movies = [],
        movie = {};
    
    function getMovies (){
        return new Promise(function (resolve, reject){
            $http.get('/api/movies')
                .then(function (response) {
                    console.log('MovieService Response: ', response);
                    movies = response.data;
                    console.log('MovieService ResponseData: ', movies);
                    resolve(movies);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    };

    function getMovie(id){
        //console.log('MovieID: ', id);
        return new Promise(function (resolve, reject){
            $http.get('/api/movies/preview-movie/' + id)
                .then(function (response){
                    console.log('MovieService response: ', response);
                    movie = response.data.movie;
                    console.log('MovieService getMovie: ', movie);
                    resolve(movie);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    return{
        getMovies: getMovies,
        getMovie: getMovie
    }
})