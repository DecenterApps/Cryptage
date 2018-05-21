global.Ipfs = function() {
  this.files = {
    add: jest.fn().mockResolvedValue([{}]),
    get: jest.fn().mockResolvedValue({}),
    cat: jest.fn().mockResolvedValue({}),
  };
};
