'use strict';

describe('Controller: AppCtrl', function () {

  beforeEach(module('receipter'));

  var AppCtrl;

  beforeEach(inject(function ($controller) {
    AppCtrl = $controller('AppCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
