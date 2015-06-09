'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:listReceiptController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('listReceiptController', function($log, $scope, $timeout, $stateParams, $ionicPopup, $state, receiptService)
    {
        $scope.receipts = receiptService.list();
        $log.debug($scope.receipts);
        $scope.data = {
          showDelete: false,
          showReorder: false,
          canSwipe: true
        };
        $scope.retrieveNext = function()
        {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.edit = function(id)
        {
            $state.go('^.edit', {id: id});
        }
        $scope.new = function()
        {
            $state.go('^.add');
        }
        $scope.delete = function(id)
        {
            $ionicPopup.confirm(
            {
                title: 'Delete Receipt?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    receiptService.remove(id, function()
                    {
                         $ionicPopup.alert(
                        {
                          title: 'Receipt Removed!',
                          template: ''
                        }).then(function()
                        {
                            $timeout(function()
                            {
                                $scope.receipts = receiptService.list();
                            }, 0);
                        });
                    });
                }
            });
        }

    });
