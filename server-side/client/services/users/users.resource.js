'use strict';

angular.module('receipter')
  .factory('Users', function ($resource) {
    return $resource('/api/userss/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
