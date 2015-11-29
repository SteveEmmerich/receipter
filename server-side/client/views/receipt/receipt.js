'use strict'


angular.module('receipter')
    .config(function ($stateProvider)
    {
        $stateProvider
            .state('app.receipt',
            {
                url: '/receipt/:id',
                views:
                {
                    'sidemenu': {
                        templateUrl: 'views/sidemenu/sidemenu.html',
                        controller: 'SidemenuCtrl',
                        controllerAs: 'vm'
                    },
                    'viewContent':
                    {
                        templateUrl: 'views/receipt/form.html',
                        controller: 'ReceiptFormCtrl',
                        controllerAs: 'vm'
                    },
                    /*'fabContent':
                    {
                        templateUrl: 'views/receipt/fab.html',
                        controller: 'ReceiptFormCtrl',
                        controllerAs: 'vm'
                    }*/
                }
            })
            .state('app.photo',
            {
                url: "/upload",
                views:
                {
                    'sidemenu': {
                        templateUrl: 'views/sidemenu/sidemenu.html',
                        controller: 'SidemenuCtrl',
                        controllerAs: 'vm'
                    },
                    'viewContent':
                    {
                        templateUrl: 'views/receipt/upload.html',
                        controller: 'ReceiptPhotoCtrl',
                        controllerAs: 'vm'
                    },
                    'fabContent':
                    {
                        templateUrl: 'views/receipt/fab.html'
                    }
                }
            })
            .state('app.export',
            {
                url: '/export',
                views:
                {
                    'sidemenu': {
                        templateUrl: 'views/sidemenu/sidemenu.html',
                        controller: 'SidemenuCtrl',
                        controllerAs: 'vm'
                    },
                    'viewContent':
                    {
                        templateUrl: 'views/receipt/export.html',
                        controller: 'ReceiptExportCtrl',
                        controllerAs: 'vm'
                    },
                    'fabContent':
                    {
                        templateUrl: 'views/receipt/fab.html'
                        
                    }
                }
            });
    });