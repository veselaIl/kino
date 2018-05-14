app.factory('MovieService', function($http){
    var movies = [];
    
    function getMovies (){
        return new Promise(function (resolve, reject){
            $http.get('/movies')
                .then(function (response) {
                    console.log('MovieService Response: ', response);
                    movies = response.data;
                    resolve(movies);
                })
                .catch(function(err){
                    reject(err);
                });
        });
    }
    return{
        getMovies: getMovies
    }
})