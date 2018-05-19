app.factory('LoginService', function ($http, $rootScope){

    function loginUser(user) {
        console.log('Login user Service: ', user);
        return new Promise(function (resolve, reject){
            $http.post('/login', user)
                .then(function (response){
                    console.log('Login Service Response: ', response);
                    console.log('Login Service Response Data: ', response.data);
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