'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:FormController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('addEditItemController', function($log, $scope, $timeout, $stateParams, $ionicPopup, $state, $ionicModal, categoryService, receiptService)
    {

        var blankItem = {name: '', cost: '', quantity: 1, category: 'None', total: 0};
        $scope.item = blankItem;
        $log.debug('In the item controller');
       // $scope.receipts = receiptService.list();

        $scope.categories = categoryService.list(); //TODO: change these services to be a one stop shop fo r managing receipts and categories
        // TODO: add in stuff for temp receipt
        $scope.receipt = receiptService.getTemp().receipt;
        if (angular.isDefined($stateParams.iid) && $stateParams.iid != -1) //If iid we are editing an item
        {
                $log.debug('receipt: ', $scope.receipt, 'Id: ', $stateParams.id, 'Iid: ', typeof($stateParams.iid));
                $scope.item = $scope.receipt.items[$stateParams.iid];
        }
        else // Otherwise we are adding an item
        {
            $log.debug('Adding New Item');
            $scope.item = blankItem;
           // $scope.receipt = receiptService.getTemp().receipt;
        }
        $scope.saveItem = function()
        {
            $ionicPopup.confirm(
            {
                title: 'Save Item?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    $timeout(function()
                    {
                        if ($stateParams.iid > -1)
                        {
                            $scope.receipt.items[$stateParams.iid] = $scope.item;
                        }
                        else
                        {
                            $scope.item._id = $scope.receipt.items.length;
                            $scope.receipt.items.push($scope.item); //<- TODO: next
                        }
                        $scope.item = {name: '', cost: '', quantity: 1, category: ''};
                        $ionicPopup.alert(
                        {
                          title: 'Item Saved!',
                          template: ''
                        }).then(function()
                        {
                            receiptService.saveTemp($scope.receipt, {});
                            $state.go('app.receipt.edit', {id: -1});
                        });
                    }, 0, true);
                }
            });

  		};
  		$scope.cancelItem = function()
        {
            $ionicPopup.confirm(
            {
                title: 'Cancel Item?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    //$scope.closeModal();

                    $state.go('^.receipt', {id: $scope.receipt._id});
                }
            });
        };


        //TODO: Adding modal for item adding. should be to the point of adding up the total cost of items. still need to fix the nav and categoies.
  		$scope.getTotal = function()
  		{

  			$timeout(function()
  			{
                $scope.item.total = ($scope.item.cost * $scope.item.quantity);
  			});
            return $scope.item.total;
  		};

    });


