#! /bin/bash

ORACLE=OwnedOracle.sol

OUTPUT=full

# Create directory if it does not exist
if [ ! -d $PWD/full ]; then
  mkdir -p $PWD/full;
fi

truffle-flattener contracts/$ORACLE > $OUTPUT/$ORACLE
