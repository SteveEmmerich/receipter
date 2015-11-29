'use strict';

angular.module('receipter')
    .controller('ReceiptFormCtrl', function ($scope, $timeout, $mdDialog, $stateParams, $state, Receipt)
    {
        var vm = this;

        vm.id = $stateParams.id;
        console.log('receipt id', vm.id);
       // vm.title = angular.isUndefined(vm.id) || vm.id === '' ? 'New' : 'Edit';
        //Binding the CouchDB
        vm.loaded = Receipt.bound();
        Receipt.bind(vm)
            .then(function()
            {
                vm.loaded = true;
                if (angular.isDefined(vm.id) && vm.id != '')
                {
                    vm.receipt = angular.copy(Receipt.get(vm.id));
                    console.log(vm.receipt);
                    vm.title = 'Edit';
                }
                $scope.$watch('receipt.items', function(ne, pre)
                {
                    console.log('calling watch');
                    if( ne !== pre)
                    {
                        console.log('things changed', ne, pre);
                        var total = 0;
                        vm.receipt.items.forEach(
                            function(element)
                            {
                                console.log(total);
                                total += element.totalCost;
                            });
                        $timeout(function()
                        {
                            vm.receipt.total = total;
                        },0 );
                    }
            
                });
            });
        if (angular.isUndefined(vm.id) || vm.id === '')
        {
            vm.receipt = {
                store: '',
                items: [],
                total: 0
            };
            vm.title = 'New';
        }
        vm.updateTotalCost = function()
        {
            var total = 0;
            vm.receipt.items.forEach(
                function(element)
                {
                    console.log(total);
                    total += element.totalCost;
                });
            $timeout(function()
            {
                vm.receipt.total = total;
            },0 );
        };
        vm.addItem = function(ev)
        {
            console.log('event: ', ev);
            $mdDialog.show(
            {
                controller: AddItemCtrl,
                templateUrl: 'views/receipt/partials/addItem.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    item: {}
                }
            }).
            then(function(res)
            {
                console.log('res', res);
                if(res.ok)
                {
                    vm.receipt.items.push(res.item);
                    vm.updateTotalCost();
                }
            });
        };
        vm.editItem = function(ev, item)
        {
            console.log('event: ', ev, item);
            $mdDialog.show(
            {
                controller: AddItemCtrl,
                templateUrl: 'views/receipt/partials/addItem.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    item: item
                }
            }).
            then(function(res)
            {
                console.log('res', res);
                if(res.ok)
                {
                    vm.receipt.items.push(res.item);
                    vm.updateTotalCost();
                }
            });
        };
        vm.cancel = function(ev)
        {
            $mdDialog.show (
                $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title('Cancel')
                    .content('Are you sure you want to cancel changes?')
                    .ariaLabel('Cancel Receipt Confirmation')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(ev)
            ).then(
                function()
                {
                    $state.go('app.home');
                });
        };
        vm.save = function(ev)
        {
            vm.showSpinner = true;
            console.log('in save function');
            if(angular.isUndefined(vm.id)  || vm.id === '')
            {
                console.log('saving new');
                Receipt.create(vm.receipt)
                    .then(function(doc/* doc */)
                    {
                        console.log('new saved', doc);
                        vm.showSpinner = false;
                        alertSaved(ev,
                            function()
                            {
                                console.log('sending to home');
                                $state.go('app.home');
                            });
                    })
                    .finally(function(e)
                    {
                        console.log('finally', e);
                    });
            }
            else
            {
                console.log('saving change');
                Receipt.update(vm.receipt)
                    .then(function (doc)
                    {
                        console.log('edit saved', doc);
                        vm.showSpinner = false;
                        alertSaved(ev,
                            function()
                            {
                                console.log('sending to home');
                                $state.go('app.home');
                            });
                    })
                    .finally(function(e)
                    {
                        console.log('finally edit', e);
                    });
            }
        };
        vm.deleteReceipt = function(ev)
        {
            $mdDialog.show (
                $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title('Delete')
                    .content('Delete Receipt')
                    .ariaLabel('Delete Receipt Confirmation')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(ev)
            ).then(
                function()
                {
                    Receipt.remove(vm.id)
                        .then(function(res)
                        {
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Removed')
                                    .content('Receipt has been deleted')
                                    .ariaLabel('Delete Receipt Alert')
                                    .ok('Ok')
                                    .targetEvent(ev)
                            )
                            .then(function()
                            {
                                $state.go('app.home');
                            });
                        });
                    console.log('in alert show');
                });
        };
        function alertSaved(ev, cb)
        {
            $mdDialog.show (
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('Saved')
                    .content('Receipt was saved')
                    .ariaLabel('Saved Receipt Alert')
                    .ok('Thanks')
                    .targetEvent(ev)
            ).then(
                function()
                {
                    cb()
                    console.log('in alert show');
                });
        };
       
        //Dialog Controller
        function AddItemCtrl($scope, $mdDialog, item)
        {
            $scope.item = item;
            $scope.hide = function()
            {
                $mdDialog.hide();
            };
            $scope.cancel = function()
            {
                $mdDialog.cancel();
            };
            $scope.ok = function(ok, item)
            {
                $mdDialog.hide({ok: ok, item: item});
            };
            $scope.updateCostTotalQuan = function(el)
            {
                $scope.item.totalCost = (el * $scope.item.cost);
            };
            $scope.updateCostTotalCos = function(el)
            {
                $scope.item.totalCost = (el * $scope.item.quantity);
            };
        };
    });
