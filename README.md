# Tidbit Example

An example of how to use the Tidbit library with ZeppelinOS

https://github.com/levelkdev/tidbit/tree/tidbit-zos

### Setup

Make sure you have the following installed globally:

ZeppelinOS: `npm install -g zos`

Then run `npm install`

`chmod +x ./scripts/**` to grant execute permissions on the scripts directory

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

### Create new instance

Create a new instance of a contract
```
$ zos create OwnedOracle --init initialize --network development|kovan
```

### Test

Run `npm run compile` before first test run, and after any changes to the `.sol` files

```
$ npm test
```

Run `npm run test:coverage` to run with coverage reporting
