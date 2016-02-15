myApp.factory('Authentication', function($firebase, FIREBASE_URL, $location){

	var ref = new Firebase(FIREBASE_URL);

	var myObject = {
		login: function(user){
			return ref.authWithPassword({
				email: user.email,
				password: user.password
			}, function(err, data){
				if(err){
					console.log('Error: ' + err);
				} else {
					console.log('Logged in: ' + data);
					$location.path('/meetings');
				}
			});
		}//login
	};//object

	return myObject;
});