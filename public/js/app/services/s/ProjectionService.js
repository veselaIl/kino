app.factory('ProjectionService', function ($http){

    //Get all Projections from all cinemas by date
    function getProjections(date) {
        console.log('ProjectionService', date);
        var dateParam = '';
        if (date) {
            dateParam += '?date=' + date.getTime();
            console.log('ProjectionService dateParam', dateParam);
        }
        return new Promise(function (resolve, reject) {
            $http.get('/api/projections' + dateParam)
                .then(function (response){
                    console.log('ProjectionService ResponseData:', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    };

    //get all projections of current cinema
    function getCinemaProjections(id, date) {
        console.log('ProjectionService', date);
        var dateParam = '';
        if (date) {
            dateParam += '?date=' + date.getTime();
            console.log('ProjectionService dateParam', dateParam);
        }
        return new Promise(function (resolve, reject) {
            $http.get('/api/cinemas/' + id + '/projections' + dateParam)
                .then(function (response){
                    console.log('ProjectionService ResponseData:', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    };
    // function getMoviesByID(movieID){
    //     return new Promise(function (resolve, reject){
    //         $http.get('/api/movies-projections?movieID=' + movieID)
    //             .then(function (response){
    //                 movies = response.data;
    //                 console.log('Movies ProjectionService', response);
    //                 resolve(movies);
    //             })
    //             .catch(function (err){
    //                 reject(err);
    //             })
    //     })
    // };


    return {
        getProjections: getProjections,
        getCinemaProjections: getCinemaProjections
        //getMoviesByID : getMoviesByID
    }
})