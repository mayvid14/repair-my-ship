var users = require('./dbuserschema');
var posts = require('./dbpostschema');
var comments = require('./dbcommentschema');
var replys = require('./dbreplyschema');
module.exports = {
    getUserByEmailAndPasswd: function (em, pw) {
        return users.findOne({
            email: em
            , passwd: pw
        });
    }
    , addANewUser: function (name, email, dob, passwd, gender, bio, picurl) {
        var user = new users({
            fullname: name
            , email: email
            , passwd: passwd
            , dob: dob
            , gender: gender
            , bio: bio
            , dp: picurl
            , postuv: []
            , postdv: []
            , comuv: []
            , comdv: []
        });
        return user.save();
    }
    , addPost: function (uid, title, desc, url) {
        var post = new posts({
            title: title
            , description: desc
            , image: url
            , userId: uid
            , uv: []
            , dv: []
        });
        return post.save();
    }
    , getPostsData: function () {
        return posts.find().populate('userId', 'dp fullname _id').exec();
    }
    , getUserPostsData: function (uid) {
        return posts.find({
            userId: uid
        }).exec();
    }
    , getUserCommentsData: function (uid, res) {
        return comments.find({
            userId: uid
        }).exec();
    }
    , createComment: function (uid, pid, txt) {
        var comment = new comments({
            comment: txt
            , postId: pid
            , userId: uid
            , uv: []
            , dv: []
        });
        return comment.save();
    }
    , getComments: function (pid, res) {
        return comments.find({
            postId: pid
        }).populate('userId', 'dp fullname _id').exec();
    }
    , upvotePost: function (uid, pid) {
        return posts.findOne({
            _id: pid
        }).exec(function (err, doc) {
            doc.uv.push(uid);
            doc.save();
        });
    }
    , upvotePostUser: function (uid, pid) {
        return users.findOne({
            _id: uid
        }).exec(function (err, doc) {
            doc.postuv.push(pid);
            doc.save();
        });
    }
    , downvotePost: function (uid, pid) {
        return posts.findOne({
            _id: pid
        }).exec(function (err, doc) {
            doc.dv.push(uid);
            doc.save();
        });
    }
    , downvotePostUser: function (uid, pid) {
        return users.findOne({
            _id: uid
        }).exec(function (err, doc) {
            doc.postdv.push(pid);
            doc.save();
        });
    }
    , upvoteComment: function (uid, cid) {
        return comments.findOne({
            _id: cid
        }).exec(function (err, doc) {
            doc.uv.push(uid);
            doc.save();
        });
    }
    , upvoteCommentUser: function (uid, cid) {
        return users.findOne({
            _id: uid
        }).exec(function (err, doc) {
            doc.comuv.push(cid);
            doc.save();
        });
    }
    , downvoteComment: function (uid, cid) {
        return comments.findOne({
            _id: cid
        }).exec(function (err, doc) {
            doc.dv.push(uid);
            doc.save();
        });
    }
    , downvoteCommentUser: function (uid, cid) {
        return users.findOne({
            _id: uid
        }).exec(function (err, doc) {
            doc.comdv.push(cid);
            doc.save();
        });
    }
    , getstats: function (uid) {
        return users.findOne({
            _id: uid
        }, 'postuv postdv comuv comdv').exec();
    }
};