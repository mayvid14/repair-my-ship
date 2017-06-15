var dbobject = require('./dbobject');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var replySchema = new dbobject.mongoose.Schema({
    reply: {
        type: String
    }
    , createdOn: {
        type: Number
        , default: Date.now
    }
    , commentId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'comments'
    }
    , userId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }
    , uv: {
        type: Number
        , default: 0
    }
    , dv: {
        type: Number
        , default: 0
    }
});
module.exports = dbobject.db.model('replys', replySchema);