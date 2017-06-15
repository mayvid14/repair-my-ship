app.controller('homectrl', ['$scope', '$sessionStorage', '$window', 'Upload', '$timeout', 'homefac', function ($scope, $sessionStorage, $window, Upload, $timeout, homefac) {
    $scope.postPic = null;
    $scope.postArr = [];
    $scope.comment = '';
    if ($sessionStorage.get('userData')) {
        $scope.currUser = $sessionStorage.get('userData');
    }
    else {
        $window.location.href = './login';
    }
    $scope.refreshStats = function () {
        var p = homefac.getStats($scope.currUser._id);
        p.then(function (data) {
            $scope.puv = data.data.postuv;
            $scope.pdv = data.data.postdv;
            $scope.cuv = data.data.comuv;
            $scope.cdv = data.data.comdv;
            $sessionStorage.put('stats', data.data);
        }, function (err) {
            throw err;
        });
    }
    $scope.logout = function () {
        $sessionStorage.empty();
        console.log($sessionStorage.userData);
        $window.location.href = './login';
    };
    $scope.postupload = function () {
        Upload.upload({
            url: '/newpost'
            , method: 'POST'
            , data: {
                uid: $scope.currUser._id
                , title: $scope.postTitle
                , description: $scope.postDescription
                , file: $scope.postPic
            }
        , }).then(function (response) {
            $timeout(function () {
                /*file.result = response.data;*/
                Materialize.toast('Uploaded', 3000);
                /*/////////////////////////////////////////////////////////////////////////////*/
                var p1 = homefac.getPosts();
                p1.then(function (data) {
                    $scope.postArr = data;
                }, function (err) {
                    throw err;
                });
                $scope.postPic = null;
                $scope.comment = '';
                $scope.refreshStats();
            });
        }, function (response) {
            Materialize.toast('Failed', 3000);
        }, function (evt) {
            Materialize.toast('Uploading', 100);
        });
    };
    var p1 = homefac.getPosts();
    p1.then(function (data) {
        $scope.postArr = data;
    }, function (err) {
        throw err;
    });
    $scope.getComments = function (pid) {
        var p2 = homefac.getComments(pid);
        p2.then(function (data) {
            $scope.commes = data;
            /*$('.collapsible').collapsible();*/
        }, function (err) {
            throw err;
        });
    };
    $scope.postComment = function (id, txt) {
        var uid = $scope.currUser._id;
        var p3 = homefac.postComment(uid, id, txt);
        p3.then(function (data) {
            /*///////////////////////////////////////////////////////////////*/
            var p1 = homefac.getPosts();
            p1.then(function (data) {
                $scope.postArr = data;
            }, function (err) {
                throw err;
            });
            $scope.postPic = null;
            $scope.comment = '';
            $scope.refreshStats();
        }, function (err) {
            throw err;
        });
        console.log("Id: " + id);
        console.log("Com :" + txt);
    };
    $scope.uvpost = function (uid, pid) {
        var prom = homefac.uvpost(uid, pid);
        prom.then(function (data) {
            Materialize.toast('Done', 2000);
            /*///////////////////////////////////////////////////////////////*/
            var p1 = homefac.getPosts();
            p1.then(function (data) {
                $scope.postArr = data;
            }, function (err) {
                throw err;
            });
            $scope.postPic = null;
            $scope.comment = '';
            $scope.refreshStats();
        }, function (err) {
            Materialize.toast('Error', 2000);
            console.log(err);
        });
    };
    $scope.dvpost = function (uid, pid) {
        var prom = homefac.dvpost(uid, pid);
        prom.then(function (data) {
            Materialize.toast('Done', 2000);
            /*///////////////////////////////////////////////////////////*/
            var p1 = homefac.getPosts();
            p1.then(function (data) {
                $scope.postArr = data;
            }, function (err) {
                throw err;
            });
            $scope.postPic = null;
            $scope.comment = '';
            $scope.refreshStats();
        }, function (err) {
            Materialize.toast('Error', 2000);
            console.log(err);
        });
    };
    $scope.uvcomment = function (uid, cid) {
        var prom = homefac.uvcomment(uid, cid);
        prom.then(function (data) {
            Materialize.toast('Done', 2000);
            /*///////////////////////////////////////////////////////////*/
            var p1 = homefac.getPosts();
            p1.then(function (data) {
                $scope.postArr = data;
            }, function (err) {
                throw err;
            });
            $scope.postPic = null;
            $scope.comment = '';
            $scope.refreshStats();
        }, function (err) {
            Materialize.toast('Error', 2000);
            console.log(err);
        });
    };
    $scope.dvcomment = function (uid, cid) {
        var prom = homefac.dvcomment(uid, cid);
        prom.then(function (data) {
            Materialize.toast('Done', 2000);
            /*///////////////////////////////////////////////////////////*/
            var p1 = homefac.getPosts();
            p1.then(function (data) {
                $scope.postArr = data;
            }, function (err) {
                throw err;
            });
            $scope.postPic = null;
            $scope.comment = '';
            $scope.refreshStats();
        }, function (err) {
            Materialize.toast('Error', 2000);
            console.log(err);
        });
    };
    $scope.check = function (uid, uv) {
        var found = 0;
        for (var i = 0; i < uv.length; i++) {
            if (_.isEqual(uid, uv[i])) found = 1;
        }
        if (found) {
            //console.log('found');
            return true;
        }
        else {
            //console.log('not found');
            return false;
        }
    }
    $scope.refreshStats();
}]);