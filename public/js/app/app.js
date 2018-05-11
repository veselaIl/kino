

var app = angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/index', {
                controller: 'HomeController',
                templateUrl: '/js/app/controllers/home/index.html'
            })
    })

    angular.module('app', ['ui.bootstrap']);
    angular.module('app', ['ngAnimate']);