var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngSanitize', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'mwl.confirm', 'multipleDatePicker'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/admin', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/view.html',
                title: 'Админ'
            })
            .when('/admin/cinema', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/view.html',
                title: 'Кина'
            })
            .when('/admin/cinema/add',{
                controller: 'AddCinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/add.html',
                title: 'Добави кино'
            })
            .when('/admin/cinema/:id/add/zala', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/zala.html',
                title: 'Добави зала'
            })
            .when('/admin/cinema/edit/:kinoID/:zalaID', {
                controller: 'CinemaController',
                templateUrl: '/js/app/controllers/admin/cinema/editZala.html',
                title: 'Редактирай зала'
            })
            .when('/admin/movies', {
                controller: 'MovieController',
                templateUrl: '/js/app/controllers/admin/movie/view.html',
                title: 'Филми'
            })
            .when('/admin/movies/add',{
                controller: 'AddMovieController',
                templateUrl: '/js/app/controllers/admin/movie/add.html',
                title: 'Добави филм'
            })
            .when('/admin/movies/edit/:id',{
                controller: 'MovieController',
                templateUrl:'/js/app/controllers/admin/movie/edit.html',
                title:'Редактирай'
            })
            .when('/admin/projections', {
                controller: 'ProjectionController',
                templateUrl: '/js/app/controllers/admin/projection/view.html',
                title: 'Прожекции'
            })
            .when('/admin/projections/add', {
                controller: 'ProjectionController',
                templateUrl: "/js/app/controllers/admin/projection/add.html",
                title: 'Добави прожекция'
            })
            .when('/admin/projections/:id',{
                controller: 'ProjectionController',
                templateUrl: "/js/app/controllers/admin/projection/details.html",
                title: 'Прожекция Детайли'
            })
            .when('/admin/users', {
                controller: 'UserController',
                templateUrl: '/js/app/controllers/admin/users/view.html',
                title: 'Потребители'
            })
            .when('/admin/messages',{
                controller: 'AdminController',
                templateUrl: 'js/app/controllers/admin/board/view.html',
                title: 'Съобщения'
            })
            .when('/admin/messages/:id', {
                controller: 'AdminController',
                templateUrl: 'js/app/controllers/admin/board/view-message.html',
                title: 'Съобщениe'
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