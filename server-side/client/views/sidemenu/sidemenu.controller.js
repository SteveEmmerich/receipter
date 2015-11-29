'use strict';

angular.module('receipter')
  .controller('SidemenuCtrl', function ($scope, $mdSidenav, Auth) {

    $scope.openLeftMenu = function()
    {
       $mdSidenav('left').toggle();
    }
    $scope.menus = [
        {
           name: 'home',
           route: 'app.home'
        }
    ];
    $scope.profile = [
        {
            name: 'profile',
            route: '/profile',
            icon: 'account_circle'
        },
        {
            name: 'logout',
            route: 'login',
            icon: 'logout',
            click: Auth.$unauth()
        }
    ];

  });
