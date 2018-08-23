pragma solidity ^0.4.24;

import "tidbit-contracts-zos/contracts/BasicOracle.sol";

contract OwnedOracle is BasicOracle {

  function initialize() public isInitializer("OwnedOracle", "0.1.0") {
    BasicOracle.initialize(msg.sender);
  }

}
