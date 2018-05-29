myApp.controller('UserController', function ($scope, $location, $routeParams, UserService) {
    // Get users
    UserService.getUsers()
        .then(function (users){
            console.log(users);
            $scope.$apply(function () {
                $scope.users = users;
            });            
        })
    
    //pop-up delete user
    $scope.vm = {};
    $scope.vm.titleBox="Изтриване на потребител"
    $scope.vm.message = "Сигурни ли сте? ";
    $scope.vm.confirmText = "Да <i class='glyphicon glyphicon-ok'></i> ";
    $scope.vm.cancelText = "Не <i class='glyphicon glyphicon-remove'></i>";
    $scope.vm.onConfirm = function(userID){
    UserService.removeUser(userID)
        .then(function (response){
            if(response.status === 200){
                var index = $scope.users.findIndex(user => user._id === userID);
                // var zalaIndex = $scope.cinemas[index].zali.findIndex(item => item.zalaID === zala.zalaID);
                $scope.users.splice(index, 1);
                $scope.$apply();
            }
        })
    }
});