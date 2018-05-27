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
    
    //Get movie projections in all cinemas
    function getMovieProjections(id, date) {
        console.log('ProjectionService', date);
        var dateParam = '';
        if (date) {
            dateParam += '?date=' + date.getTime();
            console.log('ProjectionService dateParam', dateParam);
        }
        return new Promise(function (resolve, reject) {
            $http.get('/api/movies/' + id + '/projections' + dateParam)
                .then(function (response){
                    console.log('ProjectionService ResponseData:', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    };

    return {
        getProjections: getProjections,
        getCinemaProjections: getCinemaProjections,
        getMovieProjections: getMovieProjections        
    }
})