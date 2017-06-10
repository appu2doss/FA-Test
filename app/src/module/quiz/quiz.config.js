(function () {
    'use strict';
    angular.module("quiz", [])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('quiz', {
                            url: "/quiz"
                            , title: "quiz"
                            , templateUrl: "app/src/module/quiz/quiz.html"
                            , controller: "quizCtrl"
                            , params:{
                                userParams:""
                            }
                    })
        }]);
})();