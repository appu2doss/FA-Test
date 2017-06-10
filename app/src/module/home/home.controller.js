(function () {
    'use strict';

    angular.module('home')
        .controller('homeCtrl', ['$scope','$state',  function ($scope,$state) {

        	$scope.saveRegisteration = function($valid) {
        		if($valid) {
        			console.log($scope.userObj);
        			$state.go('quiz', {userParams: $scope.userObj});

        		} else {
        			return false;
        		}
        	}
        }]);
})();