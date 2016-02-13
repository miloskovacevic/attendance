myApp.controller('MeetingsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var ref = new Firebase('https://attendance-crni.firebaseio.com/meetings');
    var meetings = $firebaseArray(ref);

    $scope.meetings = meetings;
}]);