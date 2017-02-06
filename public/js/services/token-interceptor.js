angular.module('alurapic')
	.factory('tokenInterceptor', function($window){

		var interceptor = {};

		interceptor.response = function(response) {
			console.log('Response received');

			var token = response.headers('x-access-token');

			if(token) {
				console.log('Token accepted');
				
				// Client-side data persistance. This keeps the token into the browser session storage.
				// The token is deleted when the current tab is closed.

				$window.sessionStorage.token = token;
			}

			return response;
		};

		return interceptor;

	});