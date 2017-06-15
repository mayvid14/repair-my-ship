var dbobject = require('./dbobject');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var userSchema = new dbobject.mongoose.Schema({
    fullname: {
        type: String
        , required: true
    }
    , email: {
        type: String
        , required: true
        , unique: true
    }
    , passwd: {
        type: String
        , required: true
    }
    , dob: {
        type: Number
    }
    , gender: {
        type: String
    }
    , bio: {
        type: String
    }
    , karmalvl: {
        type: Number
        , default: 1
    }
    , postuv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
    }]
    , postdv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'posts'
    }]
    , comuv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'comments'
    }]
    , comdv: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'comments'
    }]
    , dp: {
        type: String
    }
});
module.exports = dbobject.db.model('users', userSchema);