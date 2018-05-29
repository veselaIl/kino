myApp.factory('MessagesService', function($http){

    function getAllMessages(){
        return new Promise(function (resolve, reject){
            $http.get('/admin/api/messages')
                .then(function (response){
                    console.log('MessagesService getAllMessages', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function getMessageByID(id){
        return new Promise(function (resolve, reject){
            $http.get('/admin/api/messages/' + id)
                .then(function (response){
                    console.log('MessagesService getMessageByID', response);
                    resolve(response.data);
                })
                .catch(function (err){
                    reject(err);
                });
        });
    }

    function removeMessage(id){
        return new Promise(function (resolve, reject){
            $http.post('/admin/api/messages/remove/' + id)
                .then(function (response){
                    console.log('MessagesService remove: ', response);
                    resolve(response);
                })
                .catch(function (err){
                    reject(err);
                });
        })
    }

    return {
        getAllMessages : getAllMessages,
        getMessageByID : getMessageByID,
        removeMessage : removeMessage
    }
})