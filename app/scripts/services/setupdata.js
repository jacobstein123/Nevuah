'use strict';

/**
 * @ngdoc service
 * @name nevuahApp.setupData
 * @description
 * # setupData
 * Factory in the nevuahApp.
 */
angular.module('nevuahApp')
  .factory('setupData', function () {
    // Service logic
    // ...

    var schoolId = '';
    var authKey = '';
    var userId = '';

    // Public API here
    return {
      getSchoolId: function () {
        return schoolId;
      },
      setSchoolId: function (newSchoolId) {
        schoolId = newSchoolId;
        return schoolId;
      },
      getAuthKey: function () {
        return authKey;
      },
      setAuthKey: function (newAuthKey) {
        authKey = newAuthKey;
        return authKey;
      },
      getUserId: function () {
        return userId;
      },
      setUserId: function (newUserId) {
        userId = newUserId;
        return userId;
      }
    };
  });
