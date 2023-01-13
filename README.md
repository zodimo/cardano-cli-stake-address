# cardano-cli-stake-address

This package is a command builder part of a series to wrap the cardano-cli

# Development

run the dump command to check for differences.

```bash
node run build
node dist/dump-cli-help-to-docs.js
```

# cardano-cli stake-address -h
```text 
Usage: cardano-cli stake-address 
            ( key-gen
            | build
            | key-hash
            | registration-certificate
            | deregistration-certificate
            | delegation-certificate
            )

```


# TODO

- add git integration and test coverage badges

- Implementations

- [x] stake-address

  - [x] key-gen
  - [x] key-hash
  - [x] build
  - [X] registration-certificate
  - [x] deregistration-certificate
  - [x] delegation-certificate
