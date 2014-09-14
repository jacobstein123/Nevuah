'use strict';

/**
 * @ngdoc function
 * @name nevuahApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the nevuahApp
 */
angular.module('nevuahApp')
  .controller('SetupCtrl', function ($scope, $http, setupData) {
    $scope.addSchool = function () {
    	var data = $scope.data;
    	$http.post('/createSchool', data)
    		.success(function(res) {
    			var resData = res.data;
    			setupData.setSchoolId(resData.schoolId);
    			setupData.setAuthKey(resData.authKey);
    			setupData.setUserId(resData.userId);
    	});
    };
  });
