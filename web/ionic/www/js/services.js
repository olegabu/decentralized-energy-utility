angular.module('deu.services', ['config'])

.factory('ResidentService', function(cfg, PeerService) {
  // Some fake testing data
  var meters = cfg.meters;
  var resident = cfg.residents[2];
  
  var ResidentService = {
      remove: function(meter) {
        meters.splice(meters.indexOf(meter), 1);
      },
      get: function(meterId) {
        for (var i = 0; i < meters.length; i++) {
          if (meters[i].id === parseInt(meterId)) {
            return meters[i];
          }
        }
        return null;
      },
      resident: resident
  };
  
  ResidentService.all = function() {
    var ret = [];
    _.each(ResidentService.resident.meterIds, function(meterId) {
      ret.push(_.find(meters, function(o) {
        return o.id === meterId;
      }));
    });
    
    PeerService.queryAllMeterBalances(ret);
    
    return ret;
  };

  return ResidentService;
});
