myApp.controller('MeetingsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var ref = new Firebase('https://attendance-crni.firebaseio.com/meetings');
    var meetings = $firebaseArray(ref);

    $scope.meetings = meetings;

    $scope.addMeeting = function(){
    	meetings.$add({
    		name: $scope.meetingname,
    		date: Firebase.ServerValue.TIMESTAMP
    	}).then(function(){
    		$scope.meetingname = '';
    	});
    }

    $scope.removeMeeting = function(key){
    	console.log('Rmoving meeting...');
    	meetings.$remove(key);
    }
}]);









