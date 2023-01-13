import { StakeAddress } from '../../src/stake-address';

describe('cardano-cli stake-address build', () => {
  /*
   Usage: cardano-cli stake-address build 
            ( --stake-verification-key STRING
            | --stake-verification-key-file FILE
            | --stake-script-file FILE
            )
            (--mainnet | --testnet-magic NATURAL)
            [--out-file FILE]
   */

  it('stake-verification-key, mainnet with out-file', () => {
    const stakeVerificationKey = 'vkey';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKey(stakeVerificationKey))
            .withNetwork((builder) => builder.mainnet())
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address build',
        `--stake-verification-key ${stakeVerificationKey}`,
        '--mainnet',
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key-file, mainnet with out-file', () => {
    const stakeVerificationKeyFile = 'vkey-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKeyFile(stakeVerificationKeyFile))
            .withNetwork((builder) => builder.mainnet())
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address build',
        `--stake-verification-key-file ${stakeVerificationKeyFile}`,
        '--mainnet',
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-script-file, testnetMagic with out-file', () => {
    const stakeScriptFile = 'script-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .build((builder) =>
          builder
            .withStakeComponent((builder) => builder.scriptFile(stakeScriptFile))
            .withNetwork((builder) => builder.testnetMagic(2))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address build',
        `--stake-script-file ${stakeScriptFile}`,
        '--testnet-magic 2',
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });
});
