'use strict';

describe('Service: Authentication', function () {

  beforeEach(module('receipter'));

  var Authentication;

  beforeEach(inject(function (_Authentication_) {
    Authentication = _Authentication_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
