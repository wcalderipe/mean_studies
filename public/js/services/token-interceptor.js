angular.module('alurapic')
	.factory('tokenInterceptor', function($window, $q, $location){

		var interceptor = {};

		interceptor.response = function(response) {

			var token = response.headers('x-access-token');

			if(token) {
				
				// Client-side data persistance. This keeps the token into the browser session storage.
				// The token is deleted when the current tab is closed.

				$window.sessionStorage.token = token;
				console.log('Token stored into the browser');
			}

			return response;
		};

		interceptor.request = function(config) {
			
			config.headers = config.headers || {};

			if($window.sessionStorage.token) {
				config.headers['x-access-token'] = $window.sessionStorage.token;
				console.log('Token added into request headers');
			}
			return config;
		}

		interceptor.responseError = function(rejection) {
			
			if(rejection != null && rejection.status == 401){
				// Delete the session storage cached token and redirects the user to login page if the status sent via response is 401(unauthorized);
				delete $window.sessionStorage.token;
				$location.path('/login');
			}

			return $q.reject(rejection);
		};

		return interceptor;

	});