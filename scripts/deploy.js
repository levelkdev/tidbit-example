/* globals artifacts */

const ETHPriceBet = artifacts.require('ETHPriceBet')
const BasicOracle = artifacts.require('tidbit-eth/BasicOracle')
const MedianOracle = artifacts.require('tidbit-eth/MedianOracle')

const overAccount = web3.eth.accounts[1]
const underAccount = web3.eth.accounts[2]

const oracleDataSource1 = web3.eth.accounts[3]
const oracleDataSource2 = web3.eth.accounts[4]
const oracleDataSource3 = web3.eth.accounts[5]

module.exports = async (callback) => {

  // // Deploy base level oracles
  // const oracle1 = BasicOracle.new(oracleDataSource1)
  // const oracle2 = BasicOracle.new(oracleDataSource2)
  // const oracle3 = BasicOracle.new(oracleDataSource3)
  // 
  // // Deploy MedianOracle
  // const medianOracle = MedianOracle.new([oracle1, oracle2, oracle3])
  // 
  // // Deploy betting contract
  // const ethPriceBet = ETHPriceBet.new(250, overAccount, underAccount, medianOracle.address)
}
