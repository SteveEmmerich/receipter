'use strict';

angular.module('receipter')
  .config(function ($stateProvider) {
     $stateProvider
            .state('login',
            {
                url: "/login",
                templateUrl: 'views/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('register',
            {
                url: "/signup",
                templateUrl: 'views/login/register.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('signout',
            {
                url: '/logout',
                templateUrl: 'views/login/logout.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            });
  });
