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
       // $scope.receipts = receiptService.list();

        $scope.categories = categoryService.list(); //TODO: change these services to be a one stop shop fo r managing receipts and categories
        // TODO: add in stuff for temp receipt
        $scope.receipt = receiptService.getTemp().receipt;
        if (angular.isDefined($stateParams.iid) && $stateParams.iid != -1) //If iid we are editing an item
        {
                $log.debug($scope.receipt);
                $scope.item = $scope.receipt.items[$stateParams.iid];
        }

        else // Otherwise we are adding an item
        {
            $scope.item = blankItem;
           // $scope.receipt = receiptService.getTemp().receipt;
        }
       /* $ionicModal
            .fromTemplateUrl('templates/views/addEditItem.html',
        {
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
        });*/
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
                        }).then(function(res)
                        {

                            receiptService.saveTemp($scope.receipt, {});
                            $state.go('^.receipt', {id: $scope.receipt._id});

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


