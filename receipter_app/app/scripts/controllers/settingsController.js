'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('Receipter')
    .controller('SettingsController', function($scope, pouchCollection)
    {
        var receipts = pouchCollection('receipts');
        // do something with $scope
        $scope.settings = [
    	{
    		checked: false,
    		text: 'Allow Push Notifications',
    		change: function()
    		{
    			//pushNotifications.$toggleSync();
    		}
    	},
    	{
    		checked: false,
    		text: 'Allow Server Sync',
    		change: function()
    		{
    			receipts.$toggleSync();
    		}

    	},
    	{
    		checked: false,
    		text: 'Allow Server Sync',
    		change: function()
    		{
    			receipts.$toggleSync();
    		}

    	},
    	{
    		checked: false,
    		text: 'Allow Server Sync',
    		change: function()
    		{
    			receipts.$toggleSync();
    		}

    	},
    	{
    		checked: false,
    		text: 'Allow Server Sync',
    		change: function()
    		{
    			receipts.$toggleSync();
    		}

    	}
    ];

  });
