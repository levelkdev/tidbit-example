# Tidbit Example

An example of how to use the Tidbit library with ZeppelinOS

https://github.com/levelkdev/tidbit/tree/tidbit-zos

`OwnedOracle` inherits from Tidbit's `BasicOracle` and sets the `msg.sender` as the data source.

### Setup

Install ZeppelinOS: `npm install -g zos`

Then run `npm install`

`chmod +x ./scripts/**` to grant execute permissions on the scripts directory

### Create new instance

Create a new instance of a contract
```
$ zos create OwnedOracle --init initialize --network development|kovan
```

### Compile

Recompile contracts and build artifacts.

```
$ npm run compile
```

### Deploy

Deploy contracts to network defined in truffle.js

```
$ zos push --network development|kovan
```

### Test

Run `npm run compile` before first test run, and after any changes to the `.sol` files

```
$ npm test
```
