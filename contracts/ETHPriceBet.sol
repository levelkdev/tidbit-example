pragma solidity ^0.4.24;

import "tidbit-eth/contracts/Oracles/IOracle.sol";
import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/math/Math.sol";
import "openzeppelin-eth/contracts/math/SafeMath.sol";

contract ETHPriceBet is Initializable {
  using SafeMath for uint;

  // The price of ETH which is being bet on
  uint public line;
  // The address that wins if the price is greater than the line
  address public overWagerer;
  // The address that wins if the price is lower or equal to the line
  address public underWagerer; // or equal
  // The Tidbit price oracle
  IOracle public priceOracle;
  // The amount wagered by the account
  mapping(address => uint) wagered;

  modifier isWagerer() {
    require(msg.sender == overWagerer || msg.sender == underWagerer);
    _;
  }

  function initialize (
    uint _line,
    address _overWagerer,
    address _underWagerer,
    IOracle _priceOracle
  )
    public
    initializer
  {
    line = _line;
    overWagerer = _overWagerer;
    underWagerer = _underWagerer;
    priceOracle = _priceOracle;
  }

  function () public payable isWagerer {
    wagered[msg.sender] = wagered[msg.sender] + msg.value;
  }

  function claim() public {
    require(priceOracle.isResultSet(0));
    bytes memory data = priceOracle.resultFor(0);
    uint price = bytesToUint(data);
    address winner = price > line ? overWagerer : underWagerer;
    winner.transfer(wageredAmount());
  }

  function wageredAmount() public view returns (uint) {
    Math.min(wagered[overWagerer], wagered[underWagerer]);
  }

  function withdrawExcessWager() public isWagerer {
    uint excess = wagered[msg.sender].sub(wageredAmount());
    wagered[msg.sender] = wagered[msg.sender].sub(excess);
    msg.sender.transfer(excess);
  }

  function bytesToUint(bytes b) private pure returns (uint256){
    uint256 number;
    for(uint i=0;i<b.length;i++){
       number = number + uint(b[i])*(2**(8*(b.length-(i+1))));
    }
    return number;
  }
}
