app.controller('profilectrl', ['$scope', '$sessionStorage', '$window', 'moment', 'profilefac', function ($scope, $sessionStorage, $window, moment, profilefac) {
    if ($sessionStorage.get('userData')) {
        $scope.currUser = $sessionStorage.get('userData');
        $scope.age = profilefac.calcAge($scope.currUser.dob);
        $scope.stats = $sessionStorage.get('stats');
    }
    else {
        $window.location.href = './login';
    }
    var p = profilefac.getPosts($scope.currUser._id);
    $scope.posts = [];
    $scope.postArr = [];
    p.then(function (data) {
        $scope.posts = data;
        /*$scope.initcar();*/
    }, function (err) {
        throw err;
    });
    var pp = profilefac.getComments($scope.currUser._id);
    $scope.comments = [];
    pp.then(function (data) {
        $scope.comments = data;
    }, function (err) {
        throw err;
    });
    /*$scope.temppost = $scope.posts[0];*/
    /*$scope.ready = false;*/
    /*$scope.initcar = function () {
        for (var i = 0; i < $scope.posts.length; i++) {
            var temp = $scope.posts[i];
            $scope.poinimo(temp.createdOn,temp.title,temp.description,temp.uv,temp.dv,temp.image,temp._id);
        }
        Materialize.toast('Done',3000);
        $scope.ready = true;
    };*/
    /*$scope.poinimo = function (cro, t, d, uv, dv, i, pid) {
        var ppp = profilefac.getCommentsByPost(pid);
        var co = [];
        ppp.then(function (data) {
            co = data;
            var temp = {
                pid: pid
                , cro: cro
                , t: t
                , d: d
                , uv: uv
                , dv: dv
                , i: i
                , user: $scope.currUser
                , co: co
            };
            $scope.postArr.push(temp);
        }, function (err) {
            throw err;
        });
    };*/
}]);