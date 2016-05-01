angular.module('deu.controllers', [])

.controller('DashCtrl', function($scope, ResidentService, PeerService) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.resident = ResidentService.resident;
  });
})

.controller('MeterCtrl', function($scope, $interval, ResidentService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.refresh = function() {
    $scope.meters = ResidentService.all();
    $scope.$broadcast('scroll.refreshComplete');
  };
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.refresh();
  });
  
//  $interval(refresh, 1000);

  $scope.remove = function(meter) {
    ResidentService.remove(meter);
  };
})

.controller('MeterDetailCtrl', function($scope, $stateParams, 
    ResidentService, PeerService) {
  $scope.meter = ResidentService.get($stateParams.meterId);
  
  $scope.transfer = function(amt) {
    PeerService.fund(ResidentService.resident, $scope.meter, amt)
    .then(function() {
      ResidentService.resident.balance -= amt;
      $scope.meter.balance += amt;
    });
  };
})

.controller('AccountCtrl', function($scope, cfg, ResidentService) {
  $scope.residents = cfg.residents;
  $scope.resident = ResidentService.resident;
  
  $scope.set = function(resident) {
    ResidentService.resident = resident;
    $scope.resident = resident;
  };
});
