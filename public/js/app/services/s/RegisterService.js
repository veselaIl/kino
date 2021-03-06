app.factory('RegisterService', function($http){

    function registerUser (user) {
        console.log('RegisterService', user);

        return new Promise(function (resolve, reject) {
            $http.post('/api/register', {user : user})
                .then(function (response){
                    //console.log('From Register Service response: ', response.data);
                    resolve(response.data);
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