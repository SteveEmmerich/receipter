'use strict';

angular.module('receipter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'views/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      });
  });
