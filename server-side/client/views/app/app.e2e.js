'use strict';

describe('app route', function () {

  beforeEach(function () {
    browser.get('/app');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('AppCtrl');
  });

});
