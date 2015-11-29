'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(module('receipter'));

  var UsersCtrl;

  beforeEach(inject(function ($controller) {
    UsersCtrl = $controller('UsersCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
