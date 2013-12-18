var Mongoose = require('mongoose');

exports.LibrarySchema = new Mongoose.Schema({
	symbol: { type: String },
	name: { type: String },
	address: { type: String },
	city: { type: String },
	zipcode: { type: String },
	cross_street: { type: String },
	lat: { type: String },
	lng: { type: String },
});