var appDS3 = angular.module('appDS3', [
    'ngRoute'
]);

appDS3.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/site.html'
    }).when('/admin/noticias', {
        templateUrl: 'templates/admin/noticias.html',
        controller: 'noticiaController'
    }).when('/play', {
        templateUrl: 'templates/play/play.html',
        controller: 'PlayController'
    }).when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    }).when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    }).when('/panel', {
        templateUrl: 'templates/panel/worlds.html',
        controller: 'WorldController'
    }).otherwise({
        redirectTo: '/'
    });
    //remove o /#!/ da URL
//    $locationProvider.htmlMode({
//        enabled:true,
//        requireBase:false
//    })

}).run(function ($rootScope, $window,$location) {
    $rootScope.$on('$locationChangeStart', function () {

        if ($location.path().indexOf('/admin') != -1) {
            var user = $window.sessionStorage.getItem('user');
            if (!user)
                $location.path('/login');
        }
        if ($location.path().indexOf('/play') != -1) {
            var user = $window.sessionStorage.getItem('user');
            if (!user)
                $location.path('/login');
        }
        if ($location.path().indexOf('/panel') != -1) {
            var user = $window.sessionStorage.getItem('user');
            if (!user)
                $location.path('/login');
        }

    });
});