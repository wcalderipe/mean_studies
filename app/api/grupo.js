var api = {};

module.exports = function(app) {

	api.list = function(req, res) {
		var grupos = [
			{
				_id: 1,
				nome: 'Maluco'
			},
			{
				_id: 2,
				nome : 'Palhaço'
			}
		];

		res.json(grupos);
	}

	return api;
}