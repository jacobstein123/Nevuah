'use strict';

/**
 * @ngdoc function
 * @name nevuahApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nevuahApp
 */
angular.module('nevuahApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
