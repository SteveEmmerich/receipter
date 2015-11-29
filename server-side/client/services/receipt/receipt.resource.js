'use strict';

angular.module('receipter')
  .service('Receipt', function (yngutils, Pouchyng) {
    return new Pouchyng('receipts', 'https://receipter.iriscouch.com', yngutils.ASC);
  });
