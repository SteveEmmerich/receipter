'use strict';

describe('Controller: PhotoCtrl', function () {

  beforeEach(module('receipter'));

  var PhotoCtrl;

  beforeEach(inject(function ($controller) {
    PhotoCtrl = $controller('PhotoCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
