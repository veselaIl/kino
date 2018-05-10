var myApp = angular.module('myApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/admin', {
                controller: 'AdminController',
                templateUrl: '/js/app/controllers/admin/board/view.html'
            })
            .when('/cinema', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/view.html'
            })
            .when('/movies', {
                controller: 'MovieController',
                templateUrl: '/js/app/controllers/admin/movie/view.html'
            })
            .when('/movies/add',{
                controller: 'AddMovieController',
                templateUrl: '/js/app/controllers/admin/movie/add.html',
                title: 'Добави филм'
            })
            .when('/projections', {
                controller: 'ProjectionController',
                templateUrl: '/js/app/controllers/admin/projection/view.html'
            })
            .when('/users', {
                controller: 'UserController',
                templateUrl: '/js/app/controllers/admin/users/view.html'
            })
            .when('/admin/cinema/:id', {
                controller: 'ProductController',
                templateUrl: '/js/app/controllers/product/view.html'
            })
            .otherwise({
                controller: 'NotFoundController',
                templateUrl: '/js/app/controllers/404/view.html'
            });
});