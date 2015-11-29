'use strict';

describe('users route', function () {

  beforeEach(function () {
    browser.get('/users');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('UsersCtrl');
  });

});
