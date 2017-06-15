app.factory('profilefac', function ($http, $q, moment) {
    return {
        calcAge: function (num) {
            var now = new Date();
            //console.log(moment(now));
            var a = moment(now);
            var b = moment(num);
            return a.diff(b, 'years');
        }
        , getPosts: function (uid) {
            var q = $q.defer();
            $http.post('/getuserposts', {
                uid: uid
            }).then(function (data) {
                q.resolve(data.data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , getComments: function (uid) {
            var q = $q.defer();
            $http.post('/getusercomments', {
                uid: uid
            }).then(function (data) {
                q.resolve(data.data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , getCommentsByPost: function (pid) {
            var q = $q.defer();
            $http.post('/getcomments', {
                pid: pid
            }).then(function (data) {
                q.resolve(data.data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});