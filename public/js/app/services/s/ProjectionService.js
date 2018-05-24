app.factory('ProjectionService', function ($http){

    //Get all Projections from all cinemas
    function getProjections(){
        return new Promise(function (resolve, reject){
            $http.get('/api/projections')
                .then(function (response){
                    console.log('ProjectionService ResponseData:', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    };

    function getMoviesByNames(names){
        return new Promise(function (resolve, reject){
            $http.get('/api/projections/movies/', { params : { "movie[]" : names}})
                .then(function (response){
                    movies = response.data.movies;
                    console.log(movies, 'Movies ProjectionService')
                    resolve(movies);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    };


    return {
        getProjections: getProjections,
        getMoviesByNames : getMoviesByNames
    }
})