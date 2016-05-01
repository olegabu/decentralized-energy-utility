/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService($log, $q, $http, cfg) {
  
  // jshint shadow: true
  var PeerService = this;
  
  var payload = {
      'jsonrpc': '2.0',
      'params': {
        'type': 1,
        'chaincodeID': {},
        'ctorMsg': {},
        'secureContext': cfg.secureContext
      },
      'id': 0
  };
  
  PeerService.report = function(m) {
    $log.debug('PeerService.report', m);
    
    payload.method = 'invoke';
    payload.params.chaincodeID.name = cfg.chaincodeID.report;
    payload.params.ctorMsg['function'] = 'report';
    payload.params.ctorMsg.args = ['' + m.id, 
                                   '' + (m.consumer ? (m.connected ? m.load : 0) : -1 * m.power)];
    
    $log.debug('payload', payload);
    
    return $http.post(cfg.endpoint, payload).then(function(data) {
      $log.debug('result', data.data.result);
    });
  };
  
  PeerService.settle = function() {
    $log.debug('PeerService.settle');
    
    payload.method = 'invoke';
    payload.params.chaincodeID.name = cfg.chaincodeID.report;
    payload.params.ctorMsg['function'] = 'settle';
    
    $log.debug('payload', payload);
    
    return $http.post(cfg.endpoint, payload).then(function(data) {
      $log.debug('result', data.data.result);
    });
  };
  
  PeerService.queryMeterBalance = function(m) {
    var d = $q.defer();
    
    $log.debug('PeerService.queryBalance');
    
    payload.method = 'query';
    payload.params.chaincodeID.name = cfg.chaincodeID.report;
    payload.params.ctorMsg['function'] = 'balance';
    payload.params.ctorMsg.args = ['' + m.id];
    
    $log.debug('payload', payload);
    $log.debug('args', payload.params.ctorMsg.args);
    
    $http.post(cfg.endpoint, angular.copy(payload)).then(function(data) {
      $log.debug('result', data.data.result);
      m.balance = parseInt(data.data.result.message);
      m.connected = m.consumer && m.balance > 0;
      d.resolve(m);
    });
    
    return d.promise;
  };
  
  PeerService.queryAllMeterBalances = function(meters) {
    var promises = [];
    
    for(i = 0; i < meters.length; i++) {
      PeerService.queryMeterBalance(meters[i]).then(function(data) {
        var d = $q.defer();
        
        _.each(meters, function(o) {
          if(o.id === data.id) {
            o = data;
          }
        });
        
        d.resolve();
        
        promises.push(d.promise);
      });
    }
    
    return $q.all(promises);
  };
  
  PeerService.fund = function(resident, m, amt) {
    $log.debug('PeerService.fund');
    
    payload.method = 'invoke';
    payload.params.chaincodeID.name = cfg.chaincodeID.report;
    payload.params.ctorMsg['function'] = 'change';
    payload.params.ctorMsg.args = ['' + m.id, /*resident.id,*/ '' + amt];
    
    $log.debug('payload', payload);
    
    return $http.post(cfg.endpoint, payload).then(function(data) {
      $log.debug('result', data.data.result);
    });
  };

}


angular.module('peerService', []).service('PeerService', PeerService);