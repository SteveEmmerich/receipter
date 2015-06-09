'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:PictureController
 * @description
 * # PictureController
 */
angular.module('Receipter')
    .controller('PictureController', function($scope, pouchCollection)
    {
        $scope.receipts = pouchCollection('receipts');
        // do something with $scope
        $scope.save = function(pic)
        {
    	   $scope.receipts.$add(pic);
    	   console.log('added', pic.storeName, 'to collection');
        };
    });
