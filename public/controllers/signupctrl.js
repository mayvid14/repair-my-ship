app.controller('signupctrl', ['$scope', '$window', '$sessionStorage', function ($scope, $window, $sessionStorage) {
    if ($sessionStorage.get('userData')) {
        $window.location.href = './';
    }
    /*$scope.$watch('gender',function(newval,oldval){
        console.log(newval);
    });*/
    $scope.bio = '';
    $scope.signup = function () {
        var name = $scope.fn;
        var email = $scope.semail;
        var dob = Date.parse($scope.dob);
        var passwd = $scope.passwd;
        var gender = $scope.gender;
        var bio = $scope.bio;
        var obj = {
            name: name
            , email: email
            , dob: dob
            , passwd: passwd
            , gender: gender
            , bio: bio
        };
        $sessionStorage.put('temp', obj);
        if ($sessionStorage.get('temp')) {
            console.log('written');
            $window.location.href = './imgup';
        }
    };
}]);