app.factory('FooterService', function ($http){

    function sendMessage(message){
        return new Promise(function (resolve, reject){
            $http.post('/api/contacts-form', { message : message })
                .then(function (response){
                    console.log('sendMessage', response);
                    resolve(response);
                })
                .catch(function (err){
                    reject(err);
                })
        })
    }

    return {
        sendMessage: sendMessage
    }
})