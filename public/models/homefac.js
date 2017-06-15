app.factory('homefac', function ($http, $q) {
    return {
        getPosts: function () {
            var q1 = $q.defer();
            $http.post('/getposts', {
                yo: 1
            }).then(function (data) {
                q1.resolve(data.data);
            }, function (err) {
                q1.reject(err);
            });
            return q1.promise;
        }
        , getComments: function (pid) {
            var q2 = $q.defer();
            $http.post('/getcomments', {
                pid: pid
            }).then(function (data) {
                q2.resolve(data.data);
            }, function (err) {
                q2.reject(err);
            });
            return q2.promise;
        }
        , postComment: function (uid, pid, txt) {
            var q3 = $q.defer();
            $http.post('/postcomment', {
                uid: uid
                , pid: pid
                , txt: txt
            }).then(function (data) {
                q3.resolve(data.data);
            }, function (err) {
                q3.reject(err);
            });
            return q3.promise;
        }
        , uvpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/uvpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , dvpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/dvpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , uvcomment: function (uid, cid) {
            var q = $q.defer();
            $http.post('/uvcomment', {
                uid: uid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , dvcomment: function (uid, cid) {
            var q = $q.defer();
            $http.post('/dvcomment', {
                uid: uid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , getStats: function (id) {
            var q = $q.defer();
            $http.post('/getstats', {
                uid: id
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});