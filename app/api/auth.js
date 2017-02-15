var mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	model = mongoose.model('Usuario'),
	api = {};

module.exports = function(app) {
	api.auth = function(req, res) {
		var login = req.body.login;
		var senha = req.body.senha;

		model
			.findOne({login: login, senha: senha})
			.then(function(user) {
        if (!user) {
					console.log('Invalid login or password');
					return res.sendStatus(401);
        }

        var token = jwt.sign({login: user.login}, app.get('secret'), {expiresIn: 84600});
        console.log('Token generated successfully');
        res.set('x-access-token', token);
        return res.end();
			}, function(err) {
				console.log('Invalid login or password');
				res.sendStatus(401);
			});
	}

	api.verifyToken = function(req, res, next) {
		var token = req.headers['x-access-token'];
    if (!token) {
			console.log('No access token found in the request');
			return res.sendStatus(401);
    }

    console.log('Checking Token...');
    jwt.verify(token, app.get('secret'), function(err, decoded){
      if (err) {
        console.log('Token denied.');
        return res.sendStatus(401);
      }

      req.user = decoded;
      return next();
    });
	}

	return api;
};
