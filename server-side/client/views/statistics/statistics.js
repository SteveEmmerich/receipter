'use strict';

angular.module('receipter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/statistics', {
        templateUrl: 'views/statistics/statistics.html',
        controller: 'StatisticsCtrl',
        controllerAs: 'vm'
      });
  });
