/* globals artifacts web3 */

global.artifacts = artifacts;
global.web3 = web3;

const { Contracts, SimpleProject  } = require('zos-lib')

const ETHPriceBet = Contracts.getFromLocal('ETHPriceBet')
const BasicOracle = Contracts.getFromLocal('BasicOracle')
const MedianOracle = Contracts.getFromLocal('MedianOracle')

const overAccount = web3.eth.accounts[1]
const underAccount = web3.eth.accounts[2]

const oracleDataSource1 = web3.eth.accounts[3]
const oracleDataSource2 = web3.eth.accounts[4]
const oracleDataSource3 = web3.eth.accounts[5]

module.exports = async (callback) => {

  console.log('Creating an ETHPriceBet project')
  const project = new SimpleProject('ETHPriceBet', { from: web3.eth.accounts[0] })

  console.log('Creating 3 BasicOracles contracts')
  const oracle1 = await project.createProxy(BasicOracle, { initArgs: [oracleDataSource1] })
  const oracle2 = await project.createProxy(BasicOracle, { initArgs: [oracleDataSource2] })
  const oracle3 = await project.createProxy(BasicOracle, { initArgs: [oracleDataSource3] })
  console.log('Oracle 1: ' + oracle1.address + ' dataSource: ' + oracleDataSource1)
  console.log('Oracle 2: ' + oracle2.address + ' dataSource: ' + oracleDataSource2)
  console.log('Oracle 3: ' + oracle3.address + ' dataSource: ' + oracleDataSource3)

  console.log()

  console.log('Creating MedianOracle contract')
  const medianOracle = await project.createProxy(MedianOracle, { initArgs: [[oracle1.address, oracle2.address, oracle3.address]] })
  console.log('MedianOracle: ' + medianOracle.address)

  console.log()

  console.log('Creating ETHPriceBet contract')
  const ethPriceBet = await project.createProxy(ETHPriceBet, { initArgs: [250, overAccount, underAccount, medianOracle.address] })
  console.log('ETHPriceBet: ' + ethPriceBet.address)

  console.log()
}
