'use strict';

/**
 * @ngdoc service
 * @name Receipter.ReceiptService
 * @description
 * # ReceiptService
 * Handles receipt storage
 *
 */
// TODO: add function to save temp and return faux index
angular.module('Receipter')
	.factory('receiptService', function($rootScope, $ionicPopup, $log, $filter, $timeout, pouchCollection)
    {
        var db = pouchCollection('receipts');
        var scope = $rootScope.$new();
        scope.submit = function(done)
        {
            db.$add(scope.newReceipt, done);
        };

        return {
            add: function(receipt, cb)
            {
                $ionicPopup.confirm(
                {
                    title: 'Save?',
                    template: 'Are you sure?'
                })
                .then(function(res)
                {
                    if (res)
                    {
                        db.$add(receipt);
                        var saved = $ionicPopup.show(
                        {
                            title: 'Receipt Saved' //<-here
                        });
                        $timeout(function()
                        {
                            saved.close();
                            cb();
                        }, 3);
                    }
                });
            },
            update: function(receipt, cb)
            {
                scope.title = 'Edit Category';

                $ionicPopup.confirm(
                {
                    title: 'Save?',
                    template: 'Are you sure?'
                })
                .then(function(res)
                {
                    if (res)
                    {
                        db.$update(receipt);
                        var saved = $ionicPopup.show(
                        {
                            title: 'Receipt Saved' //<-here
                        });
                        $timeout(function()
                        {
                            saved.close();
                            cb();
                        }, 3);
                    }
                });


            },
            remove: function(receiptOrId, cb)
            {
                $ionicPopup.confirm({
	                title: 'Remove',
	                template: 'Are you sure you want to remove this Receipt?'
	                })
	                .then(function(res)
	                {
	                    if (res)
                        {
		                    db.$remove(receiptOrId, function(err)
                            {
                                if (err)
                                {
                                    $log.error('error saving', err);
                                }
                                var saved = $ionicPopup.show(
                                {
                                    title: 'Receipt Deleted' //<-here
                                });
                                $timeout(function()
                                {
                                    saved.close();
                                    cb();
                                }, 3);
                            });
                        }
		            });
            },
            list: function()
            {
                return db;
            },
            saveTemp: function(receipt, item)
            {
                scope.tempReceipt = receipt;
                scope.tempItem = item;
            },
            getTemp: function()
            {
                var tRep = angular.copy(scope.tempReceipt);
                var tItm = angular.copy(scope.tempItem);
               // scope.tempReceipt = undefined;
            //    scope.tempItem = undefined;
                $log.debug('Returning Receipt: ', tRep);
                return {receipt: tRep, item: tItm};
            },
            loadReceipt: function(id, cb)
            {
                db.$db.get(id).then(
                    function(item)
                    {
                        scope.tempReceipt = item;
                        $log.debug('Loaded Receipt: ', scope.tempReceipt);
                        cb(null, item);
                    });
            },
            unloadReceipt: function()
            {
                scope.tempReceipt = undefined;
                $log.debug('Unloaded Receipt: ', scope.tempReceipt);
            }

        };
    });


