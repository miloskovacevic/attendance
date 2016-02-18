myApp.controller('CheckinsController', function($scope, $routeParams, $firebaseObject, $firebaseArray, $rootScope, $location, Authentication, FIREBASE_URL){
	
	$scope.whichmeeting = $routeParams.mId;
	$scope.whichuser = $routeParams.uId;

	var userRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

	var checkinsList = $firebaseArray(userRef);
	$scope.checkins = checkinsList;

	$scope.addCheckin = function(){
		var checkinsObj = $firebaseArray(userRef);

		var myData = {
			firstname: $scope.user.firstname,
			lastname: $scope.user.lastname,
			email: $scope.user.email,
			date: Firebase.ServerValue.TIMESTAMP
		};

		checkinsObj.$add(myData).then(function(){
			//send to our list of checkins
			$location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
		});
	}

	$scope.deleteCheckin = function(id){
		var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + id);
		var record = $firebaseObject(ref);
		record.$remove(id);
	}
});

