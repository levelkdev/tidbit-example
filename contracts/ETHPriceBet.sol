pragma solidity ^0.4.24;

import "tidbit-eth/contracts/Oracles/IOracle.sol";
import "zos-lib/contracts/Initializable.sol";

contract ETHPriceBet is Initializable {

  // The price of ETH which is being bet on
  uint public line;
  // The address that wins if the price is greater than the line
  address public over;
  // The address that wins if the price is lower or equal to the line
  address public under; // or equal
  // The Tidbit price oracle
  IOracle public priceOracle;

  function initialize (
    uint _line,
    address _over,
    address _under,
    IOracle _priceOracle
  )
    public
    payable
    initializer
  {
    line = _line;
    over = _over;
    under = _under;
    priceOracle = _priceOracle;
  }

  function claim() public {
    require(priceOracle.isResultSet(0));
    bytes memory data = priceOracle.resultFor(0);
    uint price = bytesToUint(data);
    address winner = price > line ? over : under;
    winner.transfer(address(this).balance);
  }

  function bytesToUint(bytes b) private pure returns (uint256){
    uint256 number;
    for(uint i=0;i<b.length;i++){
       number = number + uint(b[i])*(2**(8*(b.length-(i+1))));
    }
    return number;
  }
}
