'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:FormController
 * @description
 * # FormController
 */
angular.module('Receipter')
  .controller('EditController', function($log, $scope, $timeout, $params, $ionicPopup, pouchCollection) 
  {
      $scope.receipts = pouchCollection('receipts')
      $scope.receipt = $scope.receipts[$params];
  	  $scope.categories = [
        {
          name: 'test',
          selected: true
        }
      ];
  		$scope.addItem = function()
  		{
  			$timeout(function()
  			{
  				$scope.receipt.items.push({name: '', cost: '', quantity: 1});
  			}, 0, true);
  		};
  		$scope.removeItem = function()
  		{
  			$timeout(function()
  			{
  				$scope.receipt.items.pop();
  			}, 0, true);
  		};
  		$scope.getTotal = function()
  		{
  			$timeout(function()
  			{
				var total = 0;  				
  				$scope.receipt.items.forEach(function(item)
  				{
  					total += (item.cost * item.quantity);
  				});
  			});
  		};
  		$scope.submit = function()
  		{
        $log.debug('Saving');
        $ionicPopup.confirm(
        {
          title: 'Save Receipt?',
          template: ''
        })
        .then(function(res)
        {
          if(res)
          {
            $scope.receipts.$update($scope.receipt);
            $scope.showAlert(function(res) {});
          }
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
  })
  .filter('fTotal', function()
  {
  	return function(data)
  	{
  		if(typeof (data) === 'undefined' && typeof (key) === 'undefined')
      {
  			return 0;
      }
  		var sum = 0;
  		for (var i = 0; i < data.length; ++i)
  		{
  			sum += (data[i].cost * data[i].quantity);
  		}

  		//$scope.total = sum;
  		return sum;
  	};

  });