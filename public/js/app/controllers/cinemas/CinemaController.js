app.controller('CinemaController', function ($scope, $rootScope, $routeParams, CinemaService, ProjectionService) {   
    //GET All cinemas page
    CinemaService.getCinemas()
        .then(function (cinemas){
            console.log('CinemaController CinemaService.getCinemas(): ', cinemas);
            $scope.cinemas = cinemas;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

    //Get current Cinema Page
    CinemaService.getCinema($routeParams.id)
        .then(function (cinema){
            $scope.cinema = cinema;
            $scope.$apply();
        })
        .catch(function (err){
            console.log(err);
        })

     //Show all projections of current cinema
    function showCinemaProjections(id, date) {
        ProjectionService.getCinemaProjections(id, date)
            .then(function (data) {
                console.log('showCinemaProjections data', data);
                $scope.projections = Array.isArray(data.projections) ? data.projections : [];
                $scope.cinemaDetails = data.cinema ? data.cinema : {};
                $scope.movieDetails = Array.isArray(data.movies) ? data.movies : [];
                $scope.$apply();
            })
            .catch(function (err){
                console.log(err);
            });
    }
    
    $scope.cinemas = [];
    $scope.cinema = {};
    $scope.projections = [];
    $scope.today = moment(new Date(),'DD-MM-YYYY');
    $scope.week = [];
    for (var i = 0; i < 7; i++){
        $scope.week.push(moment().add(i,'days'));
    }
    $scope.activeDay = $scope.week[0];
    console.log('activeDay ' + $scope.activeDay, $scope.activeDay);
    $scope.setActive = function(day){
        console.log('setActive ' + day, day);
        console.log();
        $scope.activeDay = day;
        console.log('$scope.activeDay', $scope.activeDay);
        if($routeParams.id){
            showCinemaProjections($routeParams.id, day.toDate());
        }
        
    }

    console.log('projections getProjections');
    showCinemaProjections($routeParams.id, $scope.activeDay.toDate());  

    //contacts form sending message
    $scope.sendMessage = function($event, invalid){
        $event.preventDefault();
        if (!$scope.validateEmail($scope.message.email)) {
            console.log('Invalid email!');
        } else {
            if (!$scope.validatePhone($scope.message.phoneNumber)) {
                console.log('Invalid email!');
            } else {
                if(!invalid){
                    CinemaService.sendMessage($scope.message)
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

    $scope.initMessage = {
        username: '',
        email: '',
        phoneNumber: '',
        textMessage: ''
    }
    $scope.message = angular.copy($scope.initMessage);

    // Alerts
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
    moment.locale("bg");
    
});