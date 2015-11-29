'use strict';

angular.module('receipter')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sidemenu', {
        templateUrl: 'views/sidemenu/sidemenu.html',
        controller: 'SidemenuCtrl',
        controllerAs: 'vm'
      });
  });
