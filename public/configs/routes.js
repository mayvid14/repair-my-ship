app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../views/home.html'
        , controller: 'homectrl'
    }).when('/profile', {
        templateUrl: '../views/profile.html',
        controller: 'profilectrl'
    });
});