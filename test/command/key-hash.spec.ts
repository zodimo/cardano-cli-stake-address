import { StakeAddress } from '../../src/stake-address';

describe('cardano-cli stake-address key-hash', () => {
  /*
  Usage: cardano-cli stake-address key-hash 
            ( --stake-verification-key STRING
            | --stake-verification-key-file FILE
            )
            [--out-file FILE]
  */
  it('stake-verification-key without out-file', () => {
    const stakeVerificationKey = 'my-special-key';

    expect(
      StakeAddress.createWithCardanoCliBin()
        .keyHash((builder) => builder.withStakeVerificationKey((builder) => builder.value(stakeVerificationKey)))
        .getCommand(),
    ).toBe(['cardano-cli stake-address key-hash', `--stake-verification-key ${stakeVerificationKey}`].join(' '));
  });

  it('stake-verification-key with out-file', () => {
    const stakeVerificationKey = 'my-special-key';
    const outFileName = 'my-out-file';

    expect(
      StakeAddress.createWithCardanoCliBin()
        .keyHash((builder) =>
          builder
            .withStakeVerificationKey((builder) => builder.value(stakeVerificationKey))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address key-hash',
        `--stake-verification-key ${stakeVerificationKey}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key-file without out-file', () => {
    const stakeVerificationKeyFile = 'my-special-key-file';

    expect(
      StakeAddress.createWithCardanoCliBin()
        .keyHash((builder) => builder.withStakeVerificationKey((builder) => builder.file(stakeVerificationKeyFile)))
        .getCommand(),
    ).toBe(
      ['cardano-cli stake-address key-hash', `--stake-verification-key-file ${stakeVerificationKeyFile}`].join(' '),
    );
  });

  it('stake-verification-key-file with out-file', () => {
    const stakeVerificationKeyFile = 'my-special-key-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .keyHash((builder) =>
          builder
            .withStakeVerificationKey((builder) => builder.file(stakeVerificationKeyFile))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address key-hash',
        `--stake-verification-key-file ${stakeVerificationKeyFile}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });
});
