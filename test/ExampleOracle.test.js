import { toAscii } from 'web3-utils'
import expectRevert from './helpers/expectRevert'

const ExampleOracle = artifacts.require('ExampleOracle')

require('chai').should()

const RESULT = 'hello oracle'

contract('ExampleOracle', (accounts) => {
  const dataSource = accounts[1]

  it('should set result from data source', async () => {
    const oracle = await ExampleOracle.new()
    await oracle.initialize()
    await oracle.setResult(RESULT, { from: dataSource })
    const result = await oracle.resultFor(0)
    toAscii(result).replace(/\u0000/g, '').should.equal(RESULT)
  })

  it('should revert with wrong dataSource', async () => {
    const oracle = await ExampleOracle.new()
    await oracle.initialize()
    await expectRevert(oracle.setResult(RESULT))
  })

})
