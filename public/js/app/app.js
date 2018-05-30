
var app = angular.module('App', ['angular.filter','ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngStorage', 'ngYoutubeEmbed']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
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
        .when('/cinemas/view-cinema/:id', {
            controller: 'CinemaController',
            templateUrl: '/js/app/controllers/cinemas/view-cinema.html',
            title: 'Кина'
        })
        .when('/movies/:id/', {
            controller: 'MovieController',
            templateUrl: '/js/app/controllers/movies/preview-movie.html',
            title: 'Филми'
        })
        .when('/cinemas/:id/projections', {
            controller: 'CinemaController',
            templateUrl: '/js/app/controllers/cinemas/cinema-projections.html',
            title: 'Прожекции'
        })
        .when('/projections', {
            controller: 'ProjectionController',
            templateUrl: '/js/app/controllers/projections/projections.html',
            title: 'Прожекции'
        })
        .when('/book/:_id', {
            controller: 'BookProjectionController',
            templateUrl: '/js/app/controllers/booking/booking-ticket.html',
            title: 'Резервирай'
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
            controller: 'CollapseController'
        })
        .when('/profile', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/profile.html',
            title: 'Моят профил'
        })
        .when('/profile/change-password', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/change-password.html',
            title: 'Моят профил'
        })
        .when('/profile/favourites', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/favourites.html',
            title: 'Моят профил'
        })
        .when('/profile/newsletter', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/newsletter.html',
            title: 'Моят профил'
        })
        .when('/profile/orders', {
            controller: 'UserController',
            templateUrl: '/js/app/controllers/user/orders.html',
            title: 'Моят профил'
        })
        .when('/booking-ticket/:id', {
            controller: 'BookingController',
            templateUrl: '/js/app/controllers/booking/booking-ticket.html'
        })
        .when('/booking-ticket/:id/ticket-type', {
            controller: 'BookingController',
            templateUrl: '/js/app/controllers/booking/ticket-type.html'
        })
        .when('/booking-ticket/:id/order-final', {
            controller: 'BookProjectionController',
            templateUrl: '/js/app/controllers/booking/ticket-order-final.html'
        })
        .when('/contacts', {
            controller: 'FooterController',
            templateUrl: '/js/app/controllers/footer/contacts.html'
        })
        .when('/feedback', {
            controller: 'FooterController',
            templateUrl: '/js/app/controllers/footer/feedback.html'
        })
        .otherwise({
            controller: 'NFCtrl',
            templateUrl: '/js/app/controllers/404/view.html'
        });

});
