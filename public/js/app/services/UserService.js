myApp.factory('UserService', function($http) {
    var users = [];
    return{
        getUsers : function(){
            return new Promise(function (resolve, reject){
                $http.get('/admin/api/users')
                    .then(function (response){
                        resolve(response.data);
                    })
                    .catch(function (err){
                        reject(err);
                    });
            });
        },
        removeUser : function(id){
            return new Promise(function (resolve, rejects){
                $http.post('/admin/api/users/remove/' + id)
                    .then(function (response){
                        resolve(response);
                    })
                    .catch(function (err){
                        reject(err);
                    })
            })
        }
    }

});