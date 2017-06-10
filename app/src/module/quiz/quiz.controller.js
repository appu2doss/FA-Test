(function () {
  'use strict';
	var app = angular.module('quiz');
	app.controller('quizCtrl', ['$scope', 'quizSvc', '$q', '$filter', '$stateParams',  function ($scope, quizSvc, $q, $filter, $stateParams) {
		 $scope.userParamObj = $stateParams.userParams;
		 console.log($scope.userParamObj);
	}]);

	app.directive('quizDir', function(quizFactory) {
			return {
				restrict: 'AE',
				scope: {},
				templateUrl: 'app/src/module/quiz/template.html',
				link: function(scope, elem, attrs) {

					scope.userDetails = scope.$parent.userParamObj;

			         var db = openDatabase('quizDb', '1.0', 'Test DB', 2 * 1024 * 1024);
			         db.transaction(function (tx) {
			            tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_quiz (firstName, LastName, email, score');
			         });

					scope.start = function() {
						scope.id = 0;
						scope.quizOver = false;
						scope.inProgress = true;
						scope.getQuestion();
					};

					scope.reset = function() {
						scope.inProgress = false;
						scope.score = 0;
					}

					scope.getQuestion = function() {
						var q = quizFactory.getQuestion(scope.id);
						if(q) {
							scope.question = q.question;
							scope.options = q.options;
							scope.answer = q.answer;
							scope.answerMode = true;
						} else {
							scope.quizOver = true;
						}
					};

					scope.resultList = [];
					scope.checkAnswer = function() {
						if(!$('input[name=answer]:checked').length) return;

						var ans = $('input[name=answer]:checked').val();

						if(ans == scope.options[scope.answer]) {
							scope.score++;
							scope.correctAns = true;
						} else {
							scope.correctAns = false;
						}


						scope.resultList.push({
							qid: scope.qid,
							question: scope.question,
							options: scope.options,
							answer: scope.answer,
							answerValue: ans
						});


						scope.answerMode = false;
						scope.nextQuestion();
						scope.q = quizFactory.totalQuestions;
						scope.totalQuestion = scope.q.length;

						if(scope.q.length == scope.id) {
							db.transaction(function (tx) {
					            tx.executeSql('INSERT INTO LOGS (firstName, LastName, email, score) VALUES ("'+scope.$parent.userParamObj.firstName+'", "'+scope.$parent.userParamObj.lastName+'", "'+scope.$parent.userParamObj.email+'", "'+scope.score+'")');
					           //tx.executeSql("INSERT INTO LOGS (firstName, LastName, email, score) VALUES ('Ganesh', 'MS', 'ganesh@ganesh.com', 3)");
					         });
						} 	

					};

					scope.nextQuestion = function() {
						scope.id++;
						scope.getQuestion();
					}

					scope.reset();
				}
			}
		});

		app.factory('quizFactory', function() {
			var questions = [
				{
					qid: 1,
					question: "Which is the largest country in the world by population?",
					options: ["India", "USA", "China", "Russia"],
					answer: 2
				},
				{
					qid: 2,
					question: "When did the second world war end?",
					options: ["1945", "1939", "1944", "1942"],
					answer: 0
				},
				{
					qid: 3,
					question: "Which was the first country to issue paper currency?",
					options: ["USA", "France", "Italy", "China"],
					answer: 3
				},
				{
					qid: 4,
					question: "Which city hosted the 1996 Summer Olympics?",
					options: ["Atlanta", "Sydney", "Athens", "Beijing"],
					answer: 0
				},
				{	
					qid: 5,
					question: "Who invented telephone?",
					options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
					answer: 1
				}
			];

			return {
				totalQuestions : questions,
				getQuestion: function(id) {
					if(id < questions.length) {
						return questions[id];
					} else {
						return false;
					}
				}
			};
		});      



})();