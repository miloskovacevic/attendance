myApp.factory('Authentication', ['$rootScope', '$firebase', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL', function($rootScope, $firebase,  $firebaseAuth, $firebaseObject, $location, FIREBASE_URL){

	$rootScope.currentUser = '';

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
	var offAuth;

	var onAuthCallback = function(authUser){
		if(authUser){
			var userRef = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
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

			//mozda ti ovo i ne treba...
			var userRef = new Firebase(FIREBASE_URL + '/users/' + user.uid);
			var userObject = $firebaseObject(userRef);
			$rootScope.currentUser = userObject;

			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser){
				console.log(regUser);
				$location.path('/meetings');
			}).catch(function(err){
				$rootScope.message = err.message;
				console.log(err.message);
			});

		},

		register: function(user){
			return auth.$createUser({email: user.email, password: user.password})
			.then(function(regUser){

				var ref = new Firebase(FIREBASE_URL + 'users' )  //chaining 
				.child(regUser.uid).set({
          			date: Firebase.ServerValue.TIMESTAMP,
          			regUser: regUser.uid,
          			firstname: user.firstname,
          			lastname: user.lastname,
          			email:  user.email
        		}); //user info
			}); // add user
		},  //register


		logout: function(){
			return auth.$unauth();
		},// logout

		requireAuth: function(){
			return auth.$requireAuth();
		}
	};

	return myObject;
}]);