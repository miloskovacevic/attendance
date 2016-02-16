myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL', function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL){

	$rootScope.currentUser = '';

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
	var offAuth;

	var onAuthCallback = function(authUser){
		if(authUser){
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.id);
			console.log('Ovog usera trazimo: ' + userRef);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		}else {
			console.log('client unauthenticated!');
			$rootScope.currentUser = '';
		}
	}

	auth.$onAuth(onAuthCallback);

	var myObject = {

		login: function(user){
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				console.log('Nakon logina: ' + regUser);
				$location.path('/meetings');
			}).catch(function(err){
				$rootScope.message = err.message;
				console.log(err.message);
			});

		},

		register: function(user){
			return auth.$createUser({email: user.email, password: user.password});
		},  //register


		logout: function(){
			return auth.$unauth();
		}// logout
	};

	return myObject;
}]);