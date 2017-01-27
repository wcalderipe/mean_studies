module.exports = function(app) {

	var api = app.api.grupo;

	app.route('/v1/grupos')
		.get(api.list);
}