app.factory('UserService', function ($http){
    var user = {};

    function addToFavourites(id){
        return new Promise(function (resolve, reject){
            $http.post('/user/favourites/' + id)
                .then(function (response){
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function showUserInfo(){
        return new Promise(function (resolve, reject){
            $http.get('/profile', { user: user })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function changeUserInfo(user){
        console.log('UserService changeUserInfo: ', user);
        return new Promise(function (resolve, reject){
            $http.post('/profile', { user: user })
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
            $http.post('/profile/change-password', { user: user })
                .then(function(response){
                    console.log("changePassword", response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function getFavourites(user){
        return new Promise(function (resolve, reject){
            $http.get('/profile/favourites', {user : user})
                .then(function (response){
                    console.log('User Service getFavourites: ', response);
                    resolve(response.data);
                })
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