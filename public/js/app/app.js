

var app = angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: '/js/app/controllers/home/home.html'
            })
    })

    angular.module('app', ['ui.bootstrap']);
    angular.module('app', ['ngAnimate']);