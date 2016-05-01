/**
 * @class DemoController
 * @classdesc
 * @ngInject
 */
function DemoController($log, $q, $interval, $timeout, cfg, PeerService) {

  var ctl = this;
  
  ctl.now = new Date(2016, 5, 1, 12, 0);
  
  ctl.meters = cfg.meters;
  
  var clockStep = 10;
  
  _.each(ctl.meters, function(m) {
    m.load = chance.integer({min: 1, max: 5});
  });
  
  var setPower = function() {
    var totalLoad = 0, idleLoad = 0, totalPower = 0;
    
    _.each(ctl.meters, function(m) {
      if(m.connected && m.consumer) {
        totalLoad += m.load;        
      }
      else if(!m.consumer){
        idleLoad += m.load;
      }
    });

    totalPower =  totalLoad * 1.1;
    
    _.each(ctl.meters, function(m) {
      if(!m.consumer) {
        m.power = totalPower * (m.load / idleLoad);
      }
    });
  };
  
  var settle = function() {
    PeerService.settle().then(function() {
      PeerService.queryAllMeterBalances(ctl.meters).then(function() {
        $timeout(function() {
          setPower();
        }, 1000)
      });
    });
  };
  
  settle();
  
  var addTime = function() {
    ctl.now.setMinutes(ctl.now.getMinutes() + clockStep);
  };
  
  PeerService.queryAllMeterBalances(ctl.meters);
  
  ctl.tick = function() {
    
    var i = 0, minutes = ctl.now.getMinutes();
    
    if(minutes === 0) {
      settle();
    }
    else {
      for(i = 0; i < ctl.meters.length; i++) {
        if(i+1 === minutes / clockStep) {
          PeerService.report(ctl.meters[i]);
        }
      }
    }
    
    addTime();
  };
  
  var stop;
  
  ctl.clock = function() {
    if(angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
    else {
      stop = $interval(ctl.tick, 1000);
    }
  };

}

angular.module('demoController', [])
.controller('DemoController', DemoController);