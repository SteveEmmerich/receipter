'use strict';

angular.module('receipter')
  .config(function ($stateProvider) {
    $stateProvider
        .state('app',
        {
            url: '',
            abstract: true,
            templateUrl: 'views/app/app.html',
            controller: 'AppCtrl',
            controllerAs: 'vm'
        });
  });
