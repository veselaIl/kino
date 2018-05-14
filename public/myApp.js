var myApp = angular.module('myApp', ['ngRoute', 'ngMessages','ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'AdminController',
                templateUrl: '/js/app/controllers/admin/board/view.html',
                title: 'Админ'
            })
            .when('/cinema', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/view.html'
            })
            .when('/cinema/add',{
                controller: 'AddCinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/add.html',
                title: 'Добави кино'
            }
            )
            .when('/movies', {
                controller: 'MovieController',
                templateUrl: '/js/app/controllers/admin/movie/view.html',
                title: 'Филми'
            })
            .when('/movies/add',{
                controller: 'AddMovieController',
                templateUrl: '/js/app/controllers/admin/movie/add.html',
                title: 'Добави филм'
            })
            .when('/movies/edit/:id',{
                controller: 'MovieController',
                templateUrl:'/js/app/controllers/admin/movie/edit.html',
                title:'Редактирай'
            })
            .when('/projections', {
                controller: 'ProjectionController',
                templateUrl: '/js/app/controllers/admin/projection/view.html',
                title: 'Прожекции'

            })
            .when('/projections/add', {
                controller: 'ProjectionController',
                templateUrl: "/js/app/controllers/admin/projection/add.html",
                title: 'Добави прожекция'
            })
            .when('/users', {
                controller: 'UserController',
                templateUrl: '/js/app/controllers/admin/users/view.html',
                title: 'Потребители'
            })
            .when('/admin/cinema/:id', {
                controller: 'ProductController',
                templateUrl: '/js/app/controllers/product/view.html',
                title: 'Кино'
            })
            .otherwise({
                controller: 'NotFoundController',
                templateUrl: '/js/app/controllers/404/view.html',
                title : 'Not found'
            });
});

myApp.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);