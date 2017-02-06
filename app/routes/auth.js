module.exports = function(app) {
	var api = app.api.auth;
	
	app.post('/auth', api.auth);
	
	// *	Verifies the user's token on each request made by the client.
	// ** 	This route must be declared before every route that depends of its authentication effects.
	// *** 	The route above('/auth') DOES NOT NEED it once it is a login page.

	app.use('/*', api.verifyToken);

};