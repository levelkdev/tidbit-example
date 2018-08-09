pragma solidity ^0.4.24;

import "tidbit-contracts-zos/contracts/BasicOracle.sol";

contract ExampleOracle is BasicOracle {

  function initialize() public isInitializer("ExampleOracle", "0.1.0") {
    BasicOracle.initialize(address(0xf4989157c71b2df24425f81977341c2c1fbbd138));
  }

}
