const fs = require('fs');
const path = require('path');
const streamEqual = require('stream-equal');

const errorMessage = 'Your config.dist.json and config.json do not match. Please update your config.json, config.json' +
  ' needs to be a copy of config.dist.json.';

module.exports = {
  /**
   * Compares the project config file that is
   * committed and the local config file which is ignored
   */
  compareConfig: () =>
    new Promise((resolve, reject) => {
      const readStream1 = fs.createReadStream(path.resolve('./src/constants/config.dist.json'));
      const readStream2 = fs.createReadStream(path.resolve('./src/constants/config.json'));

      streamEqual(readStream1, readStream2, (err, equal) => {
        equal ? resolve() : reject(errorMessage)
      });
    })
};
