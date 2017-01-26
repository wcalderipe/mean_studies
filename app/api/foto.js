var api = {};

module.exports = function(app) {

	var fotos = [
		{
			_id: 1,
			titulo: 'Foto 1',
			url : 'http://www.superamiches.com/wp-content/uploads/2014/08/Joselito.jpg'
		},
		{
			_id: 2,
			titulo: 'Foto 2',
			url : 'https://i.ytimg.com/vi/iIIbafkFXZk/hqdefault.jpg'
		}
	];

	api.list = function(req, res) {

		res.json(fotos);
	}

	api.selectById = function(req, res) {

		var foto = fotos.find(function(foto){
			return foto._id == req.params.id;
		});

		res.json(foto);
	}

	api.deleteById = function(req, res) {
		var foto = fotos.filter(function(foto){
			return foto._id != req.params.id;
		});

		console.log(fotos);

		res.sendStatus(204);
	}

	return api;
	
}
