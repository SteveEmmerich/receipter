'use strict';

/**
 * @ngdoc function
 * @name Receipter.controller:addEditCategoryController
 * @description
 * # FormController
 */
angular.module('Receipter')
    .controller('addEditCategoryController', function($log, $scope, $timeout, $stateParams, $ionicPopup, $state, categoryService)
    {
        var blankCategory = { icon: 'None', name: '' };
        var iconsList   = [
            'ion-ionic', 'ion-arrow-up-a', 'ion-arrow-right-a', 'ion-arrow-down-a', 'ion-arrow-left-a',
            'ion-arrow-up-b', 'ion-arrow-right-b', 'ion-arrow-down-b', 'ion-arrow-left-b', 'ion-arrow-up-c',
            'ion-arrow-right-c', 'ion-arrow-down-c', 'ion-arrow-left-c', 'ion-arrow-return-right', 'ion-arrow-return-left',
            'ion-arrow-swap', 'ion-arrow-shrink', 'ion-arrow-expand', 'ion-arrow-move', 'ion-arrow-resize',
            'ion-chevron-up', 'ion-chevron-right', 'ion-chevron-down', 'ion-chevron-left', 'ion-navicon-round',
            'ion-navicon', 'ion-drag', 'ion-log-in', 'ion-log-out', 'ion-checkmark-round', 'ion-checkmark', 'ion-checkmark-circled',
            'ion-close-round', 'ion-close', 'ion-close-circled', 'ion-plus-round', 'ion-plus', 'ion-plus-circled', 'ion-alert',
            'ion-alert-circled', 'ion-android-add', 'ion-android-add-circle', 'ion-android-alarm-clock', 'ion-android-alert',
            'ion-android-apps', 'ion-android-archive', 'ion-android-arrow-back', 'ion-android-arrow-down',
            'ion-android-arrow-dropdown', 'ion-android-arrow-dropdown-circle', 'ion-android-arrow-dropleft',
            'ion-android-arrow-dropleft-circle'
        ];
        $scope.categories = categoryService.list();
        if ($stateParams.id)
        {
            $scope.categories.$db.get($stateParams.id).then(
                function(item)
                {
                    $scope.category = item;
                });
        }
        else
        {
            $scope.category = blankCategory;
        }
        $scope.save = function()
        {
            if ($stateParams.id)
            {
                categoryService.edit($scope.category, function()
                {
                    $state.go('^.list');
                });
            }
            else
            {
                  categoryService.add($scope.category, function()
                  {
                      $state.go('^.list');
                  });
            }
        };

        $scope.cancel = function()
        {
              $ionicPopup.confirm(
            {
                title: 'Discard Changes?',
                template: ''
            }).then(function(res)
            {
                if (res)
                {
                    $state.go('^.list');
                }
            });
        };

    });
