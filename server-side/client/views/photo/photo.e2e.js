'use strict';

describe('photo route', function () {

  beforeEach(function () {
    browser.get('/photo');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('PhotoCtrl');
  });

});
