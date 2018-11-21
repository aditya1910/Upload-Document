// All mongo schema is exported from here
const mongoose = require('mongoose');

const userDetailsSchema = require('./User');
const userDataSchema = require('./UserData');
const fileUploadSchema = require('./FileUpload');

module.exports = {
	User: mongoose.model('User', userDetailsSchema),
	UserData: mongoose.model('UserData', userDataSchema),
	FileUpload: mongoose.model('FileUpload', fileUploadSchema),
};
