app.factory('RegisterService', function($http){
    var users = [];

    function registerUser (user) {
        console.log('RegisterService', user);
        return new Promise(function (resolve, reject) {
            $http.post('/api/register', {user : user})
                .then(function (response){
                    user._id = response.data.id;
                    console.log('response', response.data);
                    console.log('user', user);
                    users.push(user);
                    resolve();
                })
                .catch(function(err){
                    reject(err);
                });
        })
    }
    return{
        registerUser: registerUser
    }
})