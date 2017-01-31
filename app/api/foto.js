var mongoose = require('mongoose');
var api = {};

module.exports = function(app) {


	api.list = function(req, res) {

		var model = mongoose.model('Foto');

		// mongoose automatically finds the collection based on the plural of the model's name. Ex.: foto -> fotos. car -> cars.
		// find({}) returns all the documents in the collection (similar to select * from on sql-based syntax). 
		// promise after executing the query. Query all documents in the collection, then if succes or fail (first and second param).
		
		model
			.find({})
			.then(function(fotos){
				res.json(fotos);
			}, function(err) {
				console.log(err);
				res.status(500).json(err);
			});

	}

	api.selectById = function(req, res) {

	
	}

	api.deleteById = function(req, res) {
		
	}

	api.save = function(req, res) {
		
	}

	api.edit = function(req, res) {

		
	}

	return api;
	
}
