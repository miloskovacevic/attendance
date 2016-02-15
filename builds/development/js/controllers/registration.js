myApp.controller('RegistrationController', function($scope, $location, Authentication){

	$scope.login = function(){
		Authentication.login($scope.user);
	};

	$scope.register = function(){
		$location.path('/meetings');
	}
});

