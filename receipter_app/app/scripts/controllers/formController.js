'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:FormController
 * @description
 * # FormController
 */
angular.module('Receipter')
  .controller('FormController', function($log, $scope, $timeout, $ionicPopup, pouchCollection) 
  {
      $scope.receipts = pouchCollection('receipts');
  		$scope.items = [];
      $scope.categories = [
        {
          name: 'test',
          selected: true
        },
        {
          name: 'test2',
          selected: false
        },
        {
          name: 'test3',
          selected: false
        }
      ];
  		$scope.addItem = function()
  		{
  			$timeout(function()
  			{
  				$scope.items.push({name: '', cost: '', quantity: 1});
  			}, 0, true);
  		};
  		$scope.removeItem = function()
  		{
  			$timeout(function()
  			{
  				$scope.items.pop();
  			}, 0, true);
  		};
  		$scope.getTotal = function()
  		{
  			$timeout(function()
  			{
				var total = 0;  				
  				$scope.items.forEach(function(item)
  				{
  					total += (item.cost * item.quantity);
  				});
  			});
  		};
  		$scope.submit = function()
  		{
        $log.debug('adding');
  			$scope.receipts.$add(
  			{
  				store: $scope.storeName,
  				items: $scope.items,
  				date: $scope.date,
  				total: $scope.total
  			});
        $scope.showAlert(function(res)
        { 
          $scope.storeName = '';
          $scope.items = [];
          $scope.date = '';
          $scope.total = 0;
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
  })
  .filter('valid-number', function()
  {
    return function(data)
    {
      return parseInt(data.toString(), 10);
    };
  });
