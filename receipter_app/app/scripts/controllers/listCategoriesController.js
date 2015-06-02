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
        $scope.edit = function(id)
        {
            $state.go('^.edit', {id: id});
        }
        $scope.add = function()
        {
            $state.go('^.add');
        }
        $scope.delete = function(id)
        {
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
                         $ionicPopup.alert(
                        {
                          title: 'Category Saved!',
                          template: ''
                        }).then(function()
                        {
                            $timeout(function()
                            {
                                $scope.categories = categoryService.list();
                            }, 0);
                        });
                    });
                }
            });
        }

    });
