'use strict';

angular.module('receipter')
    .config(function ($stateProvider)
    {
        $stateProvider
            .state('app.home',
            {
                url: "/home",
                views:
                {
                    'sidemenu': {
                        templateUrl: 'views/sidemenu/sidemenu.html',
                        controller: 'SidemenuCtrl',
                        controllerAs: 'vm'
                    },
                    'viewContent':
                    {
                        templateUrl: 'views/home/home.html',
                        controller: 'HomeCtrl',
                        controllerAs: 'vm'
                    },
                    'fabContent':
                    {
                        templateUrl: 'views/home/fab.html'
                        //controller: 'HomeCtrl',
                        //controllerAs: 'vm'//'<button id="fab-receipt" class="button button-fab button-fab-bottom-right button-energized-900" ui-sref="app.receipt.add"><i class="icon ion-plus"></i></button>'
                    }
                }
            });
  });
