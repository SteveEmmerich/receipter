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
  	        db.$add(scope.newReceipt);
  	    };

        return {
            add: function(receipt)
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
                        })
                        $timeout(function()
                        {
                            saved.close();
                        }, 3);
                    }
                });
            },
            edit: function(receipt)
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
                        })
                        $timeout(function()
                        {
                            saved.close();
                        }, 3);
                    }
                });


            },
            remove: function(receipt)
            {
                $ionicPopup.confirm({
	                title: 'Remove',
	                template: 'Are you sure you want to remove this Category?\nNote: No receipts will be removed only the category.'
	                })
	                .then(function(res)
	                {
	                    if (res)
                        {
		                    db.$remove(receipt);
                            var saved = $ionicPopup.show(
                            {
                                title: 'Receipt Deleted' //<-here
                            })
                            $timeout(function()
                            {
                                saved.close();
                            }, 3);
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
                return {receipt: scope.tempReceipt, item: scope.tempItem};
            }

        }
    });
//	    /*return function(item, db)
//	    {
//	    	var scope = $rootScope.$new();
//	    	if (angular.isObject(item))
//	    	{
//	    		scope.receipt = item;
//	    		scope.add = false;
//	    		scope.title = 'Edit';
//	  		}
//	  		else
//	  		{
//	  			scope.add = true;
//	  			scope.title = 'Add';
//	  			scope.receipt = {};
//	  			scope.receipt.items = [];
//	  			scope.receipt.category = {};
//	  			scope.receipt.date = $filter('date')(new Date(), 'MM-dd-yyyy');
//	  			scope.receipt.store = '';
//	  		}
//
//	      	scope.categories = CATEGORIES;
//
//	  		scope.addItem = function()
//	  		{
//	  			$timeout(function()
//	  			{
//	  				scope.receipt.items.push({name: '', cost: '', quantity: 1});
//	  			}, 0, true);
//	  		};
//	  		scope.removeItem = function()
//	  		{
//	  			$timeout(function()
//	  			{
//	  				scope.receipt.items.pop();
//	  			}, 0, true);
//	  		};
//
//	  		scope.submit = function(done)
//	  		{
//	        	$log.debug('adding');
//	        	$ionicPopup.confirm(
//	        	{
//	        		title: 'Save',
//	        		template: '<p> Save This Receipt? </p?>'
//	        	})
//	        	.then(function(res)
//	        	{
//	        		if(res)
//	        		{
//	        			scope.add ? db.$add(scope.receipt) : db.$update(scope.receipt);
//			        	$ionicPopup.alert(
//				        {
//				          title: 'Receipt Saved!',
//				          template: ''
//				        }).
//				        then(function(res)
//				        {
//				        	done(res);
//				        });
//				    }
//				});
//	  		};
//	  		$ionicPopup.show(
//	  		{
//	  			title: scope.title,
//				templateUrl: 'templates/views/addEdit.html',
//  				scope: scope,
//  				buttons: [
//  				{
//				    text: 'Cancel',
//				    type: 'button-default',
//				    onTap: function(e)
//				    {
//				      // e.preventDefault() will stop the popup from closing when tapped.
//				      //e.preventDefault();
//				    }
//				},
//				{
//				    text: 'Save',
//				    type: 'button-positive ion-plane',
//				    onTap: function(e)
//				    {
//					    scope.submit(function(res)
//					    {
//					    	return res;
//					    });
//					}
//				}]
//	  		});
//
//		};
//	})
//	.filter('fTotal', function()
//	{
//	  	return function(data)
//	  	{
//	  		if(typeof (data) === 'undefined' && typeof (key) === 'undefined')
//	      {
//	  			return 0;
//	      }
//	  		var sum = 0;
//	  		for (var i = 0; i < data.length; ++i)
//	  		{
//	  			sum += (data[i].cost * data[i].quantity);
//	  		}
//
//	  		//$scope.total = sum;
//	  		return sum;
//	  	};
//	});*/

