// All mongo schema is exported from here
const mongoose = require('mongoose');

const userDetailsSchema = require('./User');
const userDataSchema = require('./UserData');
const fileUploadSchema = require('./FileUpload');
const documentSchema = require('./Document');

module.exports = {
	User: mongoose.model('User', userDetailsSchema),
	UserData: mongoose.model('UserData', userDataSchema),
	FileUpload: mongoose.model('FileUpload', fileUploadSchema),
	Document: mongoose.model('Document', documentSchema),
};
