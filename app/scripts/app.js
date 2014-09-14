'use strict';

/**
 * @ngdoc overview
 * @name nevuahApp
 * @description
 * # nevuahApp
 *
 * Main module of the application.
 */
angular
  .module('nevuahApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
