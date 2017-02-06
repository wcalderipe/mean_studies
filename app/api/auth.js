var mongoose = require('mongoose'),
	jwt 	 = require('jsonwebtoken'),
	model 	 = mongoose.model('Usuario'),
	api  	 = {};
	

module.exports = function(app) {
	
	api.auth = function(req, res) {
		
		var login 	 = req.body.login;
		var password = req.body.password;

		model
			.findOne({
				login: login,
				password: password
			})
			.then(function(user){
				if(!user) {
					console.log('Invalid login or password');
					res.sendStatus(401); // No auth.
				} else {
					/*
						 Signs the user (claimer) to the token payload. One information about the user is kept and secret keyword is required.
						 @param Object claimer - the claimer, generally an user, information to be assigned and authorized, kept in the token payload.
						 @param String keyword - the secret keyword.
						 @param Object expire  - an object containing a key specifying the expiration time for the token.

						 jwt.sign(claimer, keyword, expire);
					*/

					var token = jwt.sign({login: user.login}, app.get('secret'), {expiresIn: 84600});
					console.log('Token generated successfully');
					res.set('x-access-token', token);
				}
			}, function(err) {
				console.log('Invalid login or password');
				res.sendStatus(401);
			});
	}

	api.verifyToken = function(req, res, next) {

		// Access the incoming request headers and searches for the 'x-access-token' property, set above in the 'auth()' method.
		var token = req.headers['x-access-token'];
		
		if(token) {
			console.log('Checking Token...');
			
			/*
				JSON Web Token verifies the token received and decodes it.
				@param Object token - the token received.
				@param String secret - secret keyword set globally to enable jwt communication and methods.
				@param Function callback - function that receives the response with an error or a decoded json.

				jwt.verify(token, secret, callback);
			*/

			jwt.verify(token, app.get('secret'), function(err, decoded){
				
				if (err) {
					console.log('Token denied.');
					res.sendStatus(401);
				}

				// Appends the decoded token info into the request.
				req.user = decoded;

				// Clears the way to the next middleware in the stack. Remember this 'verifyToken' function is executed before any and every route in the application except 'auth()';
				next();
			});

		} else {
			console.log('No access token found in the request');
			res.sendStatus(401);
		}	

	}

	return api;
};