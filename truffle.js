require('babel-register')
require('babel-polyfill')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*', // Match any network id
      gas: 6000000
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8546,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    }
  }
}
