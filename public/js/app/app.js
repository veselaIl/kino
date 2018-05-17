
var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngStorage']);

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
        .when('/cinemas/view-cinema/:kinoID', {
            controller: 'CinemaController',
            templateUrl: '/js/app/controllers/cinemas/view-cinema.html',
            title: 'Кина'
        })
        // .when('/halls', {
        //     controller: 'HallController',
        //     templateUrl:'/js/app/controllers/halls/halls.html',
        //     title: 'Зали'
        // })
        .when('/movies', {
            controller: 'MovieController',
            templateUrl: '/js/app/controllers/movies/movies.html',
            title: 'Филми'
        })
        .when('/movies/preview-movie/:movieID', {
            controller: 'MovieController',
            templateUrl: '/js/app/controllers/movies/preview-movie.html',
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
        .when('/logout', {
            controller: 'LogoutController'
        })
        .when('/user/profile', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/profile.html',
            title: 'Моят профил'
        })
        .when('/movies/preview-movie/', {
            controller: 'MovieController',
            templateUrl: '/js/app/controllers/movies/preview-movie.html'
        })
        .otherwise({
            controller: 'NFCtrl',
            templateUrl: '/js/app/controllers/404/view.html'
        });
    
});