var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    taskText: String,
    status: String
}, { timestamps: true });

var UserSchema = new mongoose.Schema({
    twitterid: {type: String, required: true},
    active: {type: Boolean},
    tasks: [TaskSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);