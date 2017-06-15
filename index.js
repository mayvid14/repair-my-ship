var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var server = require('http').Server(app);
var func = require(path.join(__dirname, 'db', 'dbfunctions.js'));
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'resources'))
    }
    , filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
var upload = multer({
    storage: storage
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nm', express.static(path.join(__dirname, 'node_modules')))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'main.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});
app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'signup.html'));
});
app.get('/imgup', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'imgup.html'));
});
app.post('/login', function (req, res) {
    var em = req.body.em;
    var pw = req.body.pw;
    /*var data =*/
    func.getUserForLogin(em, pw, res);
    /*res.send(data);*/
});
app.post('/add', upload.single('file'), function (req, res) {
    var picurl = '../resources/' + req.file.filename;
    func.createUser(req.body.name, req.body.email, req.body.dob, req.body.passwd, req.body.gender, req.body.bio, picurl, res);
});
app.post('/newpost', upload.single('file'), function (req, res) {
    //console.log('title: '+req.body.title);
    //console.log('desc : '+req.body.description);
    var picurl = '';
    if (typeof req.file === 'undefined') picurl = '';
    else picurl = '../resources/' + req.file.filename;
    func.newPost(req.body.uid, req.body.title, req.body.description, picurl, res);
});
app.post('/getposts', function (req, res) {
    func.getPost(res);
});
app.post('/getuserposts', function (req, res) {
    func.getUserPost(req.body.uid, res);
});
app.post('/getusercomments', function (req, res) {
    func.getUserComment(req.body.uid, res);
});
app.post('/postcomment', function (req, res) {
    func.makeComment(req.body.uid, req.body.pid, req.body.txt, res);
});
app.post('/getcomments', function (req, res) {
    func.getCommentsByPost(req.body.pid, res);
});
app.post('/uvpost', function (req, res) {
    func.upvotePost(req.body.uid, req.body.pid, res);
});
app.post('/dvpost', function (req, res) {
    func.downvotePost(req.body.uid, req.body.pid, res);
});
app.post('/uvcomment', function (req, res) {
    func.upvoteComment(req.body.uid, req.body.cid, res);
});
app.post('/dvcomment', function (req, res) {
    func.downvoteComment(req.body.uid, req.body.cid, res);
});
app.post('/getstats', function (req, res) {
    func.getstats(req.body.uid, res);
})
app.listen(8080, function () {
    console.log('Connected to 8080');
});