(function () {
    'use strict';
    angular.module("home", [])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('home', {
                            url: "/register"
                            , title: "Register"
                            , templateUrl: "app/src/module/home/home.html"
                            , controller: "homeCtrl"
                            , params:{
                                userParams:""
                            }
                    })
        }]);
})();