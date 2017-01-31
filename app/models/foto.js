var mongoose = require('mongoose');

var schema = mongoose.Schema({
	titulo: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	grupo: {
		type: Number,
		required: true
	}
});

var Foto = mongoose.model('Foto', schema);