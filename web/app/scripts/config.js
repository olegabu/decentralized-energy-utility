angular.module('config', [])
.constant('cfg', 
{
  endpoint: 'https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode',
  secureContext: 'user_type1_f0d8a85799',
  
  chaincodeID: {
      report: 'f6a7e50c11751c9220352fc804339d45512ae2bd8001c6e8729142a3b442040afea1dbdf3eee47b45ac78e601e1bb5d42ef9c109cd8840f90dbea765ef01f80e',
      settle: '2780b7463c57f343a9e107854c4b53150018cdd8fd74ca970c028de6bfa707f6e9f6cf2b20f0af4fdd04d2167651eb29c7bfabf19e6a93ae2aff65f55202d0e6'   
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
