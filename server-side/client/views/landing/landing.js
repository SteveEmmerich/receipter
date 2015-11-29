'use strict';

angular.module('receipter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/landing', {
        templateUrl: 'views/landing/landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'vm'
      });
  });
