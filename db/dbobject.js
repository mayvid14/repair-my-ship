var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db = require('./dburl');
var connect = mongoose.connect(db.dburl);
var obj = {
    db: connect
    , mongoose: mongoose
};
module.exports = obj;