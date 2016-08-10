
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: { type: String, required: true, index: { unique: true }},
    email:    { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true }
});
