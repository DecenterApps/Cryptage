import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.decenter.com'));

global.Ipfs = function() {
  this.files = {
    add: jest.fn().mockResolvedValue([{}]),
    get: jest.fn().mockResolvedValue({}),
    cat: jest.fn().mockResolvedValue({}),
  };
};

global.web3 = {
  eth: {
    getAccounts: jest.fn().mockResolvedValue(['0xA2CC37dEb2C1d171Cf4FAaE2C8b94F64d65e3a83']),
    Contract: web3.eth.Contract
  }
};
