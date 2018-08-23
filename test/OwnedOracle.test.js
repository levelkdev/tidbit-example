import { toAscii } from 'web3-utils'
import expectRevert from './helpers/expectRevert'

const OwnedOracle = artifacts.require('OwnedOracle')

require('chai').should()

const RESULT = 'hello oracle'

contract('OwnedOracle', (accounts) => {
  const dataSource = accounts[1]

  it('should set result from data source', async () => {
    const oracle = await OwnedOracle.new({ from: dataSource })
    await oracle.initialize({ from: dataSource })
    await oracle.setResult(RESULT, { from: dataSource })
    const result = await oracle.resultFor(0)
    toAscii(result).replace(/\u0000/g, '').should.equal(RESULT)
  })

  it('should revert with wrong dataSource', async () => {
    const oracle = await OwnedOracle.new({ from: dataSource })
    await oracle.initialize({ from: dataSource })
    await expectRevert(oracle.setResult(RESULT))
  })

})
