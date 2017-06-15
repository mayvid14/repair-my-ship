var dbobject = require('./dbobject');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var postSchema = new dbobject.mongoose.Schema({
    title: {
        type: String
        , required: true
    }
    , description: {
        type: String
        , required: true
    }
    , createdOn: {
        type: String
        , default: Date.now
    }
    , image: {
        type: String
        , default: ''
    }
    , userId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }
    , uv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , dv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
});
module.exports = dbobject.db.model('posts', postSchema);