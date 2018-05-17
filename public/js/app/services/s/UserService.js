app.factory('UserService', function ($http){
    var user = {};

    function getUserProfile(user){
        return new Promise(function (resolve, reject){
            $http.get('/#!/user/profile', {user: user})
                .then(function (response){
                    user._id = response.data.id;
                    resolve(user);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    function changeUserProfile(user){
        return new Promise(function (resolve, reject){
            $http.post('/#!/user/profile', {user: user})
                .then(function (response){
                    user.firstName = response.data.firstName;
                    user.lastName = response.data.lastName;
                    resolve();
                })
                .catch(function (err){
                    console.log(err);
                })
        })
    }

    function getChangePassword(user){
        return new Promise(function (resolve, reject){
            $http.get('/#!/user/profile/change-password', {user: user})
                .then(function (response){                    
                    user._id = response.data.id;
                    resolve(user);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    function changeUserPassword(user){
        // return new Promise(function (resolve, reject){
        //     $http.post('/profile/change-password', {user: user})
        //         .then(function (response){
                    
        //         })
        // })
    }
    return{
        getUserProfile: getUserProfile,
        changeUserProfile: changeUserProfile
    }
})