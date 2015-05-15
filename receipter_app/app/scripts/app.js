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
angular.module('Receipter', ['ionic', 'ngCordova', 'ngResource', 'pouchdb'])

  .run(function($ionicPlatform) 
  {

    $ionicPlatform.ready(function() 
    {
      // save to use plugins here
      //localDB.sync(remoteDB, {live: true});
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) 
  {
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
      .state('app.home', 
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
      })
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
      .state('app.add.receipt',
      {
        url: '/add/receipt:id',
        cache: true,
        views: 
        {
          'viewContent': 
          {
            templateUrl: 'templates/views/addEditReciept.html',
            controller: 'addEditReceiptController'
          }
        }
      })
      .state('app.add.category',
      {
        url: '/add/category:id',
        cache: true,
        views:
        {
          'viewContent':
          {
            templateUrl: 'templates/views/addEditCategory.html',
            controller: 'addEditCategoryController'
          }
        }
      })
      .state('app.add.item',
      {
        url: '/add/item:id',
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
    $urlRouterProvider.otherwise('/app/home');
  });


