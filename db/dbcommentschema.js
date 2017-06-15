var dbobject = require('./dbobject');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var commentSchema = new dbobject.mongoose.Schema({
    comment: {
        type: String
    }
    , createdOn: {
        type: Number
        , default: Date.now
    }
    , postId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
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
module.exports = dbobject.db.model('comments', commentSchema);