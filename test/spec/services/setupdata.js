'use strict';

describe('Service: setupData', function () {

  // load the service's module
  beforeEach(module('nevuahApp'));

  // instantiate service
  var setupData;
  beforeEach(inject(function (_setupData_) {
    setupData = _setupData_;
  }));

  it('should do something', function () {
    expect(!!setupData).toBe(true);
  });

});
