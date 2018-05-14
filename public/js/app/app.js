
var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: '/js/app/controllers/home/home.html',
            title: 'Начало'
        })
        .when('/cinemas', {
            controller: 'CinemaController',
            templateUrl: '/js/app/controllers/cinemas/cinemas.html',
            title: 'Кина'
        })
        .when('/halls', {
            controller: 'HallController',
            templateUrl:'/js/app/controllers/halls/halls.html',
            title: 'Зали'
        })
        .when('/movies', {
            controller: 'MovieController',
            templateUrl: '/js/app/controllers/movies/movies.html',
            title: 'Филми'
        })
        .when('/projections', {
            controller: 'ProjectionController',
            templateUrl: '/js/app/controllers/projections/projections.html',
            title: 'Прожекции'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: '/js/app/controllers/authentication/login.html',
            title: 'Вход'
        })
        .when('/register', {
            controller: 'RegisterController',
            templateUrl: '/js/app/controllers/authentication/register.html',
            title: 'Регистрация'
        })
        .when('/profile', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/profile.html',
            title: 'Моят профил'
        })
        .otherwise({
            controller: 'NFCtlr',
            templateUrl: '/js/app/controllers/404/view.html'
        });
    
});

app.controller('CollapseController', function ($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
});

    