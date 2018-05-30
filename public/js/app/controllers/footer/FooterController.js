app.controller('FooterController', function($scope, FooterService){

    $scope.cinemas = [];

    $scope.initMessage = {
        username: '',
        email: '',
        phoneNumber: '',
        textMessage: ''
    }
    $scope.message = angular.copy($scope.initMessage);

    $scope.alerts = [];
    $scope.addAlert = function() {
        $scope.alerts.length = 0;
        $scope.alerts.push({ type: 'primary', msg: 'Съобщението ви беше изпратено успешно!' });
        $scope.$apply();
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // Validations
    $scope.validateEmail = function() {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String($scope.message.email).toLowerCase());
    };
    $scope.validatePhone = function() {
        var regex = /^[0-9 +]*$/gm;
        return regex.test(Number($scope.message.phone));
    }
    $scope.isSubmitted = function() {
        return $scope.submit;
    };
    $scope.clicked = function() {
        $scope.submit = true;
    };

    $scope.sendMessage = function($event, invalid){
        $event.preventDefault();
        if (!$scope.validateEmail($scope.message.email)) {
            console.log('Invalid email!');
        } else {
            if (!$scope.validatePhone($scope.message.phoneNumber)) {
                console.log('Invalid email!');
            } else {
                if(!invalid){
                    FooterService.sendMessage($scope.message, invalid)
                        .then(function (data){
                            $scope.addAlert();
                            $scope.$apply();
                        })
                        .catch(function (err){
                            console.log(err);
                        })
                }
            }
        }
    }
})