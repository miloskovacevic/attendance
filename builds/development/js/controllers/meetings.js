myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){
	
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser){
        if(authUser){
            var ref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid + '/meetings/');
            var meetingsInfo = $firebaseArray(ref);

            // console.log('Meetings object : ' + meetingsInfoObject);

            $scope.meetingsInfo = meetingsInfo;

            //after data is loaded count number of meetings...
            meetingsInfo.$loaded().then(function(data) {
              $rootScope.howManyMeetings = meetingsInfo.length;
            }); 

            meetingsInfo.$watch(function(data) {
              $rootScope.howManyMeetings = meetingsInfo.length;
            });

            $scope.addMeeting = function(){
                meetingsInfo.$add({
                    name: $scope.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function(){
                    $scope.meetingname = '';
                });
            }

            $scope.removeMeeting = function(key){
                console.log('Rmoving meeting...');
                meetingsInfo.$remove(key);
            }
        }
    });
}]);









