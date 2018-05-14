app.factory('LoginService', function ($http, $rootScope){
    var users = [];

    function loginUser(user) {
        console.log('Login user Service: ', user);
        return new Promise(function (resolve, reject){
            $http.post('/api/login', user)            
                .then(function (response){
                    console.log('Login Service Response: ', response);
                    user._id = response.data.id;
                    console.log('Login Service Response Data: ', response.data);
                    $rootScope.user = response.data;
                    resolve();
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