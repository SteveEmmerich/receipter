'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:listCategoriesController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('listCategoriesController', function($log, $scope, $timeout, $stateParams, $ionicPopup, $state, categoryService)
    {
        $scope.categories = categoryService.list();
        $scope.data = {
          showDelete: false,
          showReorder: false,
          canSwipe: true
        };
        $scope.edit = function(id)
        {
            $scope.data.showDelete = false;
            $state.go('^.edit', {id: id});
        }
        $scope.add = function()
        {
            $scope.data.showDelete = false;
            $state.go('^.add');
        }
        $scope.delete = function(id)
        {
            $scope.data.showDelete = false;
            $ionicPopup.confirm(
            {
                title: 'Delete Category?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    categoryService.remove(id, function()
                    {
                        /* $ionicPopup.alert(
                        {
                          title: 'Category Removed!',
                          template: ''
                        }).then(function()
                        {*/
                            $timeout(function()
                            {
                                $log.debug('reloading list');
                                $scope.categories = categoryService.list();
                            }, 0);
                        //});
                    });
                }
            });
        }

    });
