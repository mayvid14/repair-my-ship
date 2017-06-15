var ops = require('./dbops.js');
/*var mailer = require('./mails.js');*/
module.exports = {
    newPost: function (uid, title, desc, url, res) {
        var p = ops.addPost(uid, title, desc, url);
        p.then(function (data) {
            
            res.sendStatus(200);
        }, function (err) {
            throw err;
        });
    }
    , createUser: function (name, email, dob, passwd, gender, bio, picurl, res) {
        var p = ops.addANewUser(name, email, dob, passwd, gender, bio, picurl);
        p.then(function (data) {
            res.send({
                err: 0
            });
        }, function (err) {
            throw err;
        });
    }
    , getUserForLogin: function (em, pw, res) {
        var p = ops.getUserByEmailAndPasswd(em, pw);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , getPost: function (res) {
        var p = ops.getPostsData();
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , getUserPost: function (uid, res) {
        var p = ops.getUserPostsData(uid);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , getUserComment: function (uid, res) {
        var p = ops.getUserCommentsData(uid);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , upvotePost: function (uid, pid, res) {
        ops.upvotePost(uid, pid).then(function (data) {
            ops.upvotePostUser(data.userId, pid).then(function (data1) {
                res.send(data1);
            });
        });
    }
    , downvotePost: function (uid, pid, res) {
        ops.downvotePost(uid, pid).then(function (data) {
            ops.downvotePostUser(data.userId, pid).then(function (data1) {
                res.send(data1);
            });
        });
    }
    , upvoteComment: function (uid, cid, res) {
        ops.upvoteComment(uid, cid).then(function (data) {
            ops.upvoteCommentUser(data.userId, cid).then(function (data1) {
                res.send(data1);
            });
        });
    }
    , downvoteComment: function (uid, cid, res) {
        ops.downvoteComment(uid, cid).then(function (data) {
            ops.downvoteCommentUser(data.userId, cid).then(function (data1) {
                res.send(data1);
            });
        });
    }
    , makeComment: function (uid, pid, txt, res) {
        var p = ops.createComment(uid, pid, txt);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , giveReply: function () {}
    , getCommentsByPost: function (pid, res) {
        var p = ops.getComments(pid);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
    , getstats: function (uid, res) {
        var p = ops.getstats(uid);
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            throw err;
        });
    }
};