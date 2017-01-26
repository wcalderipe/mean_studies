module.exports = function(app) {

	var api = app.api.foto;

	app.get('/v1/fotos', api.list);

	app.route('/v1/fotos/:id')
		.get(api.selectById)
		.delete(api.deleteById);
		
}