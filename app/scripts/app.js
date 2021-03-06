'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('IonicWeatherApp', ['ionic', 'IonicWeatherApp.controllers', 'IonicWeatherApp.services'])
/*
global StatusBar
 */
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    StatusBar.styleDefault();
    // initialize localstorage to empty object on first startup
    if(!window.localStorage.length) { window.localStorage.setItem('cities', JSON.stringify({}));}
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.cities', {
      url: '/cities',
      views: {
        'tab-cities': {
          templateUrl: 'templates/tab-cities.html',
          controller: 'CityCtrl'
        }
      }
    })
    .state('tab.city-detail', {
      url: '/city/:cityId',
      views: {
        'tab-cities': {
          templateUrl: 'templates/city-detail.html',
          controller: 'CityDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

