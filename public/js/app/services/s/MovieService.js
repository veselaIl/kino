app.factory('MovieService', function($http){
    var movies = [],
        movie = {};
    
    function getMovies (){
        return new Promise(function (resolve, reject){
            $http.get('/movies')
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
            $http.get('/movies/preview-movie/' + id)
                .then(function (response){
                    console.log('MovieService2 response: ', response);
                    movie = response.data.movie;
                    console.log('MovieService2 getMovie: ', movie);
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