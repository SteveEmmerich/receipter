'use strict';

/**
 * @ngdoc function
 * @name Receipter.util:lodash
 * @description
 * # Lo-Dash
 * Expose Lo-Dash through injectable factory, so we don't pollute / rely on global namespace
 * just inject lodash as _
 */

angular.module('Receipter')
  .factory('_', function($window) {
    return $window._;
  });
