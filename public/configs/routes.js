app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'../views/home.html'
    }).when('/profile',{
        templateUrl:'../views/profile.html'
    });
});