'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:FormController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('addEditItemController', function($log, $scope, $timeout, $params, $ionicPopup, $location, $ionicModal, categoryService, receiptService)
    {

        var blankItem = {name: '', cost: '', quantity: 1, category: '', total: 0};
        $scope.receipts = receiptService.list;
        $scope.receipt = $scope.receipts[$params.id];
        $scope.categories = categoryService.list; //TODO: change these services to be a one stop shop fo r managing receipts and categories
        if ($params.iid) //If iid we are editing an item
        {
            $scope.item = $scope.receipt.items[$params.iid];
        }
        else // Otherwise we are adding an item
        {
            $scope.item = blankItem;
        }
        $ionicModal.fromTemplateUrl('templates/addEditCategory.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal)
        {
            $scope.modal = modal;
        });
        $scope.openModal = function()
        {
            $scope.modal.show();
        };
        $scope.closeModal = function()
        {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function()
        {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function()
        {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function()
        {
            // Execute action
        });
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
                        $scope.receipt.items.push($scope.item);
                        $scope.item = {name: '', cost: '', quantity: 1, category: ''};
                        $ionicPopup.alert(
                        {
                          title: 'Receipt Saved!',
                          template: ''
                        }).then(fucntion(res)
                        {
                            if ($params.iid)
                            {
                                $scope.closeModal();
                            }

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
                    $scope.closeModal();
                }
            });
        };
        $scope.removeItem = function()
  		{
            $ionicPopup.confirm(
            {
                title: 'Remove Item?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    $timeout(function()
                    {
                        $scope.receipt.items.pop();
                        $ionicPopup.alert(
                        {
                          title: 'Item Removed!',
                          template: ''
                        }).then(fucntion(res)
                        {
                            $scope.closeModal();
                        });
                    }, 0, true);
                }
            });
  		};
        //TODO: Adding modal for item adding. should be to the point of adding up the total cost of items. still need to fix the nav and categoies.
  		$scope.getTotal = function()
  		{
  			$timeout(function()
  			{
  		        var total = ($scope.item.cost * $scope.item.quantity);
  			});
  		};

    };


