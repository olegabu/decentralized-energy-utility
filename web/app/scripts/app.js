angular.module('app', ['ui.router',
                       'ui.bootstrap',
                       'peerService',
                       'demoController',
                       'config'])
                       
.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  .state('demo', {
    url: '/',
    templateUrl: 'partials/demo.html',
    controller: 'DemoController as ctl'
  });

});
