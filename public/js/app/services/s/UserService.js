app.factory('UserService', function ($http){
    var user = {};

    function addToFavourites(id){
        return new Promise(function (resolve, reject){
            $http.post('/api/user/favourites/' + id)
                .then(function (response){
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function showUserInfo(user){
        return new Promise(function (resolve, reject){
            $http.get('/api/profile', { user: user })
                .then(function (response) {
                    console.log('User Service showUserInfo: ', user);
                    console.log('User Service showUserInfo: ', response.data);
                    resolve(response.data.user);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function changeUserInfo(user){
        console.log('UserService changeUserInfo: ', user);
        return new Promise(function (resolve, reject){
            $http.post('/api/profile', { user: user })
                .then(function (response){
                    console.log("changeUserInfo", response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function changePassword(user){
        console.log('UserService changePassword: ', user);
        return new Promise(function (resolve, reject){
            $http.post('/api/profile/change-password', { user: user })
                .then(function(response){
                    console.log("changePassword", response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function getFavourites(){
        return new Promise(function (resolve, reject){
            $http.get('/api/profile/favourites')
                .then(function (response){
                    console.log('User Service getFavourites: ', response);
                    resolve(response.data.movies);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    return{
        addToFavourites: addToFavourites,
        changeUserInfo: changeUserInfo,
        showUserInfo: showUserInfo,
        changePassword: changePassword,
        getFavourites: getFavourites
    }
})