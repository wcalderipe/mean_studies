var mongoose = require('mongoose'),
 	model 	 = mongoose.model('Foto'),
	api 	 = {};

module.exports = function(app) {


	api.list = function(req, res) {

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
		
		//findById is a mongoose native method to execute a query based on the id sent in the param.

		model
			.findById(req.params.id)
			.then(function(foto){
				// Jump to the error function of this promisse and throws a custom error message.
				if(!foto) throw Error('id for current item not found');
				res.json(foto);

			}, function(err) {
				console.log(err);
				
				res.status(404).json(err);
			});

	}

	api.deleteById = function(req, res) {
		
		// remove(param) -> Query and remove based on the param sent. In this case, we're using the '_id'

		model
			.remove({_id: req.params.id})
			.then(function(){

				res.sendStatus(204);

			}, function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	}

	api.save = function(req, res) {
		
		var newFoto = req.body;

		// Creates a new item and send it back to the client.

		model
			.create(newFoto)
			.then(function(foto){
				res.json(foto);
			}, function(err){
				console.log(err);
				res.status(500).json(err);
			});
	}

	api.edit = function(req, res) {

		model
			.findByIdAndUpdate(req.params.id, req.body)
			.then(function(foto){
				res.json(foto);
			}, function(err) {
				console.log(err);
				res.status(404).json(err);
			});
		
	}

	return api;
	
}
