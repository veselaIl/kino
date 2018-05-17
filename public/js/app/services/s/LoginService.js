app.factory('LoginService', function ($http, $rootScope){
    var users = [];

    function loginUser(user) {
        console.log('Login user Service: ', user);
        return new Promise(function (resolve, reject){
            //console.log('$http.post', $http.post)
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