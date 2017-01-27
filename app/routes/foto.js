module.exports = function(app) {

	var api = app.api.foto;

	app.route('/v1/fotos')
		.get(api.list)
		.post(api.save);


	app.route('/v1/fotos/:id')
		.get(api.selectById)
		.delete(api.deleteById);

}