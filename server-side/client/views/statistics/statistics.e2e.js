'use strict';

describe('statistics route', function () {

  beforeEach(function () {
    browser.get('/statistics');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('StatisticsCtrl');
  });

});
