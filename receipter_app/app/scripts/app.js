'use strict';

/**
 * @ngdoc overview
 * @name Receipter
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

//var localDB = new PouchDB('receipts');
//var remoteDB = new PouchDB('http://receipter.com:5984/receipts');
angular.module('Receipter', ['ionic', 'ionic-material', 'ionic-datepicker', 'ionic-timepicker', 'ionic-select', 'ngCordova', 'ngResource', 'pouchdb' ])

    .run(function($ionicPlatform)
    {
        $ionicPlatform.ready(function()
        {
            // save to use plugins here
            //localDB.sync(remoteDB, {live: true});
        });
        // add possible global event handlers here
    })

    .config(function($httpProvider, $stateProvider, $urlRouterProvider)//, $ionicAppProvider)
    {
        // Identify app
       /* $ionicAppProvider.identify(
        {
            // The App ID (from apps.ionic.io) for the server
            app_id: '70de5c51',
            // The public API key all services will use for this app
            api_key: 'c1c754391b151df15b44abf1eeb0f454a28edb3a6de56f99',
            // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
            // gcm_id: 'YOUR_GCM_ID'
        });*/
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');
        // Application routing
        $stateProvider
            .state('app',
            {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })
           /* .state('app.home',
            {
                url: '/home',
                cache: true,
                views:
                {
                  'viewContent':
                  {
                    templateUrl: 'templates/views/home.html',
                    controller: 'HomeController'
                  }
                }
            })*/
            .state('app.settings',
            {
                url: '/settings',
                cache: true,
                views:
                {
                    'viewContent':
                    {
                        templateUrl: 'templates/views/settings.html',
                        controller: 'SettingsController'
                    }
                }
            })
            .state('app.receipt',
            {
                url: '/receipt',
                abstract: true,
                views:
                {
                    'viewContent':
                    {
                        templateUrl: 'templates/views/receipt.html',
                        // controller: 'addEditReceiptController'
                    }
                }
            })
            .state('app.receipt.list',
            {
                url: '/list',
                cache: false,
                views:
                {
                    'receipts':
                    {
                        templateUrl: 'templates/views/listReceipts.html',
                        controller: 'listReceiptController'
                    },
                    'fabContent':
                    {
                        template: '<button id="fab-receipt" class="button button-fab button-fab-bottom-right button-energized-900" ui-sref="app.receipt.add"><i class="icon ion-plus"></i></button>'
                    }
                }
            })
            .state('app.receipt.add',
            {
                url: '/add',
                cache: true,
                views:
                {
                    'receipts':
                    {
                        templateUrl: 'templates/views/addEditReceipt.html',
                        controller: 'addEditReceiptController'
                    },
                    /*'fabContent':
                    {
                        template: '<button id="fab-receipt" class="button button-fab button-fab-bottom-right button-energized-900" ui-sref="app.item"><i class="icon ion-plus"></i></button>'
                    }*/
                }
            })
            .state('app.receipt.edit',
            {
                url: '/edit/:id',
                cache: true,
                views:
                {
                  'receipts':
                  {
                    templateUrl: 'templates/views/addEditReceipt.html',
                    controller: 'addEditReceiptController'
                  }
                }
            })
            .state('app.category',
            {
                url: '/category',
                abstract: true,
                //cache: true,
                views:
                {
                    'viewContent':
                    {
                        templateUrl: 'templates/views/categories.html'
                    }
                }

            })
            .state('app.category.list',
            {
                url: '/list',
                cache: false,
                views:
                {
                    'categories':
                    {
                        templateUrl: 'templates/views/listCategories.html',
                        controller: 'listCategoriesController'
                    },
                    'fabContent':
                    {
                        template: '<button id="fab-receipt" class="button button-fab button-fab-bottom-right button-energized-900" ui-sref="app.category.add"><i class="icon ion-plus"></i></button>'
                    }
                }
            })
            .state('app.category.add',
            {
                url: '/add',
                cache: true,
                views:
                {
                    'categories':
                    {
                        templateUrl: 'templates/views/addEditCategory.html',
                        controller: 'addEditCategoryController'
                    }
                }
            })
            .state('app.category.edit',
            {
                url: '/edit/:id',
                cache: true,
                views:
                {
                    'categories':
                    {
                        templateUrl: 'templates/views/addEditCategory.html',
                        controller: 'addEditCategoryController'
                    }
                }
            })
            .state('app.item',
            {
                url: '/item/add/:id/:iid',
                cache: true,
                views:
                {
                    'viewContent':
                    {
                        templateUrl: 'templates/views/addEditItem.html',
                        controller: 'addEditItemController'
                    }
                }
            })
            .state('app.picture',
            {
                url: '/picture',
                cache: true,
                views:
                {
                    'viewContent':
                    {
                        templateUrl: 'templates/views/picture.html',
                    controller: 'PictureController'
                    }
                }
            });
    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/receipt/list');
  });


