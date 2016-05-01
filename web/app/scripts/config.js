angular.module('config', [])
.constant('cfg', 
{
  endpoint: 'https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode',
  secureContext: 'user_type1_f0d8a85799',
  
  chaincodeID: {
      report: 'd6d8d6efa0f641b4ff741bb51b32e9af4406c5beabfe5ad93037ebb40a30be36e317a529b134ca43eae69362418dd8628b805430bea1edba1e9a97b2739aa29f',
      settle: 'd6d8d6efa0f641b4ff741bb51b32e9af4406c5beabfe5ad93037ebb40a30be36e317a529b134ca43eae69362418dd8628b805430bea1edba1e9a97b2739aa29f'   
  },

  meters: [{
    id: 1,
    name: 'Solar Panel of Angel',
    balance: 0,
    connected: true
  }, {
    id: 2,
    name: 'Generator of Bennie',
    balance: 0,
    connected: true
  }, {
    id: 3,
    name: 'Household of Carlos',
    balance: 0,
    connected: true,
    consumer: true
  }, {
    id: 4,
    name: 'Street Light',
    balance: 0,
    connected: true,
    consumer: true
  }],
  
  residents: [{
    id: 1,
    name: 'Angel',
    balance: 1000,
    meterIds: [1]
  },
  {
    id: 2,
    name: 'Bennie',
    balance: 2000,
    meterIds: [2]
  },
  {
    id: 3,
    name: 'Carlos',
    balance: 3000,
    meterIds: [3, 4]
  }]
}
);
