'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('receipter'));

  var LoginCtrl;

  beforeEach(inject(function ($controller) {
    LoginCtrl = $controller('LoginCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
