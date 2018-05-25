app.factory('LoginService', function ($http, $rootScope){

    function loginUser(user) {
        return new Promise(function (resolve, reject){
            $http.post('/api/login', user)
                .then(function (response){
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    return {
        loginUser: loginUser
    }
})