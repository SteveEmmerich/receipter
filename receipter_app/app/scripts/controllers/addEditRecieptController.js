'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:FormController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('addEditReceiptController', function($rootScope, $log, $scope, $timeout, $stateParams, $ionicPopup, $state, receiptService, categoryService)
    {
        $scope.receipts = receiptService.list();
        $scope.categories = categoryService.list();
        //$scope.selectedCat = 'None';
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams)
            {
                if(fromState.name === 'app.item')
                {
                    $scope.receipt = receiptService.getTemp().receipt;
                    $log.debug('chaged from item', $scope.receipt);
                }
                $log.debug('state changed', toState, fromState);
            });
        $log.debug($stateParams);
  		if (angular.isUndefined($stateParams.id) || $stateParams.id == "")
        {
            $scope.receipt = {};
            $scope.storeName = '';
            $scope.receipt.date = new Date();
            $scope.id = -1;
            $scope.receipt.items = [];
            $scope.receipt.category = 'None';
            $scope.receipt._id = -1;
            receiptService.saveTemp($scope.receipt);
            $log.debug($scope.receipt.date);
        }
        else if ( $stateParams.id == -1)
        {
            $scope.receipt = receiptService.getTemp().receipt;
            $scope.id = $scope.receipt._id;
        }
        else
        {
            receiptService.loadReceipt($stateParams.id,
                function(err, item)
                {
                    $scope.receipt = item;
                });

            $scope.id = $stateParams.id;

            $log.debug('receipt Id: ' + JSON.stringify($scope.id));
        }
        $scope.onEditItem = function(item)
        {
            receiptService.saveTemp($scope.receipt, item);
            $state.go('^.item', {id: $scope.receipt._id, iid: item._id});
        };
        $scope.addItem = function()
  		{
  			receiptService.saveTemp($scope.receipt, {});
            $state.go('^.item', {id: $scope.receipt._id, iid: -1});
  		};
  		$scope.removeItem = function(item)
  		{
  			$timeout(function()
  			{
  				$scope.receipt.items.splice(item._id);
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

            if ($scope.id == -1)
            {
                $scope.receipt._id = undefined;
                receiptService.add($scope.receipt, function()
                {
                    receiptService.unloadReceipt();
                    $state.go('^.home');
                });
            }
            else
            {
                receiptService.update($scope.receipt, function()
                {
                    receiptService.unloadReceipt();
                    $state.go('^.home');
                });
            }

  		};
        $scope.cancel = function()
        {
            $ionicPopup.confirm(
            {
                title: 'Discard Changes?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    $state.go('^.home');
                }
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
