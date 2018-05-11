
var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: '/js/app/controllers/home/home.html'
            })
            .when('/projections', {
                controller: 'ProjectionsController',
                templateUrl: '/js/app/controllers/projections/projections.html'
            })
            .when('/cinemas', {
                controller: 'CinemasController',
                templateUrl: '/js/app/controllers/projections/projections.html'
            })
            .otherwise({
                controller: 'HomeController',
                templateUrl: '/js/app/controllers/home/home.html'
            })
    })
    .controller('CollapseController', function ($scope) {
        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
      });
    