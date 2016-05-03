angular.module('config', [])
.constant('cfg', 
{
  endpoint: 'https://4d886127-6d99-41a8-988a-c31ce4ae14dc_vp1-api.blockchain.ibm.com:443/chaincode',
  secureContext: 'user_type1_6d0e6eead0',
  
  chaincodeID: {
      report: 'ba3845d87fca8f1ec5ab1d077cb38907780c79260420fd94c288d6bddb710114c44969b9d560d365e38b62d379681e2acaa5b88536ebd22d6ed56c0605736349',
      settle: 'ba3845d87fca8f1ec5ab1d077cb38907780c79260420fd94c288d6bddb710114c44969b9d560d365e38b62d379681e2acaa5b88536ebd22d6ed56c0605736349'   
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
