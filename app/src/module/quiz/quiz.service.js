(function () {
 'use strict';

 angular.module('quiz')
     .service('quizSvc', ['$http', function ($http) {

     	//var json = "https://jsonplaceholder.typicode.com/posts";
     	var json = "app/src/module/quiz/json/questions.json";

     	this.getQuestions = function(data, onSuccess, onError) {
     		var  req = {
     			method: 'GET',
     			url: json
     		};
     		return $http(req);
     	};

     }]);
})();