myApp.controller('AdminController', function($scope, $rootScope, $location, $timeout, $http, $routeParams, MessagesService) {
    $scope.title = 'Admin';
    $scope.messages = [];
    $scope.message = {};

    function checkUser() {
        $http.get('/active-user')
            .then(function(response) {
                $scope.userChecked = true;
                $rootScope.user = response.data;
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            })
            .catch(function() {
                $scope.userChecked = true;
                $timeout(function () {
                    $scope.$apply();
                    $timeout(checkUser, 1000);
                }, 0);
            });
    }    
    $scope.logout = function ($event){
        $event.preventDefault();
        $http.get('/api/logout')
            .then(function (response){
                console.log($rootScope);
                console.log(response);
                $rootScope.user = null;
                window.location.href = '/';
                $timeout(function () {
                    $scope.$apply();
                }, 0);
            })
    }

    //MESSAGES PAGE
    //get all messages
    MessagesService.getAllMessages()
        .then(function (data){
            console.log('AdminController getAllMessages', data);
            $scope.messages = data;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        });

    //get current message
    console.log($routeParams);
    if($routeParams.id){
        MessagesService.getMessageByID($routeParams.id)
        .then(function (data) {
            $scope.message = data.message;
            console.log('AdminController getMessageByID', data);
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        });
    }
    
    //delete message
    $scope.vm = {};
    $scope.vm.titleBox="Изтриване на съобщение"
    $scope.vm.message = "Сигурни ли сте? ";
    $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
    $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
    $scope.vm.onConfirm = function(id){
        MessagesService.removeMessage(id)
            .then(function (response){
                if(response.status === 200){
                    var index = $scope.messages.findIndex(msg => msg._id === id);
                    $scope.messages.splice(index, 1);
                    $scope.$apply();
                }
            })
            .catch(function (err){
                console.log(err);
            });
    }
    moment.locale("bg");
});