'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('Receipter')
  .controller('HomeController', function($rootScope,$scope, receiptService, $ionicPopup, $window, $timeout, pouchCollection)
  {

    $scope.receipts = pouchCollection('receipts');

    $scope.data = {
      showDelete: false,
      showReorder: false,
      canSwipe: true
    };
    $scope.retrieveNext = function()
    {
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.edit = function(item) 
    {
      receiptService(item, $scope.receipts);
      /*$ionicPopup.prompt(
      {
        title: 'Edit ' + item.store,
        template: ''
      })
      .then(function(res)
      {
        $window.location.href = '#/receipt/' + item._id;
      });*/
    };
    $scope.add = function()
    {
      receiptService(null, $scope.receipts);
    };

    
    $scope.moveItem = function(item, fromIndex, toIndex) 
    {
      $scope.receipts.splice(fromIndex, 1);
      $scope.receipts.splice(toIndex, 0, item);
    };
    
    $scope.onItemDelete = function(item) {
      $timeout(function()
      {
        //$scope.receipts.splice($scope.receipts.indexOf(item), 1);
        $scope.receipts.$remove(item);
        $ionicPopup.alert(
        {
          title: 'Removed ' + item.store,
          template: ''
        });
      });
    };
    $scope.showAlert = function(done) 
    {
      var alertPopup = $ionicPopup.alert(
      {
        title: 'Receipt Saved!',
        template: ''
      });
      alertPopup.then(function(res) 
      {
          done(res);
      });
    };

  });
