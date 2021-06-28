var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    twitterid: String,
    active: Boolean
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);