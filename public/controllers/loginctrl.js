app.controller('loginctrl', ['$scope', '$sessionStorage', '$window', 'loginfac', function ($scope, $sessionStorage, $window, loginfac) {
    $scope.lemail = '';
    $scope.passwd = '';
    $scope.login = function () {
        var email = $scope.lemail;
        var passwd = $scope.passwd;
        var promise = loginfac.getUser(email, passwd);
        promise.then(function (data) {
            if (!data.data) $scope.msg = 'Incorrect credentials...';
            else if (typeof data.data === 'object') {
                $sessionStorage.put('userData',data.data);
                /*console.log($sessionStorage.userData);*/
                $window.location.href = './';
            }
        }, function (error) {
            console.log(error);
        });
    };
    $scope.anoncont = function () {
        $window.location.href = './';
    };
    if ($sessionStorage.get('userData')){
        $window.location.href = './';
    }
}]);