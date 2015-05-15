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
  	        db.$add(scope.newCat);
  	    };

        return {
            add: function(cat)
            {
                scope.title = 'Add Category';
                $ionicPopup.show(
                {
	      			title: scope.title, 
				    templateUrl: 'templates/views/addEditCategory.html', 
      				scope: scope,
      				buttons: [
      				{
				        text: 'Cancel',
				        type: 'button-default',
				        onTap: function(e) 
				        {
				          // e.preventDefault() will stop the popup from closing when tapped.
				          //e.preventDefault();
				        }
				    }, 
				    {
				        text: 'Save',
				        type: 'button-positive ion-plane',
				        onTap: function(e)
				        {
					        $ionicPopup.confirm({
				                    title: 'Save?',
				                    template: 'Are you sure?'
				                })				          
				                .then(function(res)
				                { 
				                    if (res)
                                    {
					                    db.$add(cat);
                                    }
					            });
					    }
				    }]
	      		});
            },
            edit: function(cat)
            {
                scope.title = 'Edit Category';
                $ionicPopup.show(
                {
	      			title: scope.title, 
				    templateUrl: 'templates/views/addEditCategory.html', 
      				scope: scope,
      				buttons: [
      				{
				        text: 'Cancel',
				        type: 'button-default',
				        onTap: function(e) 
				        {
				          // e.preventDefault() will stop the popup from closing when tapped.
				          //e.preventDefault();
				        }
				    }, 
				    {
				        text: 'Save',
				        type: 'button-positive ion-plane',
				        onTap: function(e)
				        {
				            $ionicPopup.confirm({
                                    title: 'Save?',
				                    template: 'Are you sure?'
				                })				          
				                .then(function(res)
				                { 
				                    if (res)
                                    {
					                    db.$update(cat);
                                    }
					            });
					    }
				    }]
	      		});
            },
            remove: function(cat)
            {
                $ionicPopup.confirm({
	                title: 'Remove',
	                template: 'Are you sure you want to remove this Category?\nNote: No receipts will be removed only the category.'
	                })				          
	                .then(function(res)
	                { 
	                    if (res)
                        {
		                    db.$remove(cat);
                        }
		            });
            },
            list: function()
            {
                return db;
            }
            
        };
    });
