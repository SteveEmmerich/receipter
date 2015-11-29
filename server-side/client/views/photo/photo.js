'use strict';

angular.module('receipter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/photo', {
        templateUrl: 'views/photo/photo.html',
        controller: 'PhotoCtrl',
        controllerAs: 'vm'
      });
  });
