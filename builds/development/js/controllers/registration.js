myApp.controller('RegistrationController', function($scope, $location, Authentication){

	$scope.login = function(){
		Authentication.login($scope.user);
	};

	$scope.register = function(){
		Authentication.register($scope.user)
		.then(function(user){
			Authentication.login($scope.user);
			$location.path('/meetings');
		}, function(err){
			$scope.message = err.toString();
		});
	}

	$scope.logout = function(){
		Authentication.logout();
		$location.path('/login');
	}
});

