angular.module('alurapic')
	.controller('LoginController', function($scope, $http, $location){

		$scope.user = {};
		$scope.msg = '';

		$scope.auth = function() {
			var user = $scope.user;

			$http.post('/auth', {login: user.login, password: user.password})
				.then(function() {
					
					$location.path('/');

				}, function(err) {
					console.log(err);
					$scope.msg = 'Invalid login or password';
				});
		
		};


	});