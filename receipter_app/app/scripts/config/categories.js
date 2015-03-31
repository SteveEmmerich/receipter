'use strict';

/**
 * @ngdoc constant
 * @name Receipter.CATEGORIES
 * @description
 * # CATEGORIES
 * Defines the CATEGORIES where our resources will be stored.
 * Is used inside /services/ReceiptService.js
 */


angular.module('Receipter')
  .constant('CATEGORIES', [{
  	name: 'test',
  	icon: '/icons/test.png',
  	timesUsed: 0
  }]);
//  .constant('localDB', new PouchDB('receipts'));


