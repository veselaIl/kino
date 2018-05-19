app.factory('ProjectionService', function ($http){

    //Get all Projections from all cinemas
    function getProjections(){
        return new Promise(function (resolve, reject){
            $http.get('/projections')
                .then(function (response){
                    console.log('ProjectionService ResponseData:', response.data);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    return {
        getProjections: getProjections
    }
})