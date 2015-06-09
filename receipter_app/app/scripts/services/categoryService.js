'use strict';

/**
 * @ngdoc service
 * @name Receipter.CategoryService
 * @description
 * # CategoryService
 * Opens new and edit popup boxes.
 *
 */
angular.module('Receipter')
	.factory('categoryService', function($rootScope, $ionicPopup, $log, $filter, $timeout, CATEGORIES, pouchCollection)
	{
        var db = pouchCollection('categories');
        var scope = $rootScope.$new();
        scope.submit = function(done)
        {
            db.$add(scope.newCat, done);
        };

        return {
            add: function(cat, cb)
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
                        db.$add(cat);
                        var saved = $ionicPopup.show(
                        {
                            title: 'Category Saved' //<-here
                        });
                        $timeout(function()
                        {
                            saved.close();
                            cb();
                        }, 3);
                    }
                });
            },
            edit: function(cat, cb)
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
                        db.$update(cat);
                        var saved = $ionicPopup.show(
                        {
                            title: 'Category Saved' //<-here
                        });
                        $timeout(function()
                        {
                            saved.close();
                            cb();
                        }, 3);
                    }
                });
            },
            remove: function(cat, cb)
            {
                $ionicPopup.confirm(
                {
	                title: 'Remove',
	                template: 'Are you sure you want to remove this Category?\nNote: No receipts will be removed only the category.'
	            })
	            .then(
                    function(res)
                    {
	                    if (res)
                        {
                            $log.debug('clicked yes');
		                    db.$remove(cat);
                            var saved = $ionicPopup.show(
                            {
                                title: 'Category Removed' //<-here
                            });
                            $timeout(function()
                            {
                                $log.debug('save closed');
                                saved.close();
                                cb();
                            }, 3000);
                        }
		            }
                );
            },
            list: function()
            {
                return db;
            }
        };
    });
