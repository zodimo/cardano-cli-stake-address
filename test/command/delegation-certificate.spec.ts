import { StakeAddress } from '../../src/stake-address';

describe('cardano-cli stake-address delegation-certificate', () => {
  /* 
  Usage: cardano-cli stake-address delegation-certificate 
            ( --stake-verification-key STRING
            | --stake-verification-key-file FILE
            | --stake-script-file FILE
            )
            ( --stake-pool-verification-key STRING
            | --cold-verification-key-file FILE
            | --stake-pool-id STAKE-POOL-ID
            )
            --out-file FILE
  */

  it('stake-verification-key, stake-pool-verification-key and out-file', () => {
    const stakeVerificationKey = 'vkey';
    const stakePoolVerificationKey = 'pool-vkey';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .delegationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKey(stakeVerificationKey))
            .withStakePoolComponent((builder) => builder.verificationKey(stakePoolVerificationKey))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address delegation-certificate',
        `--stake-verification-key ${stakeVerificationKey}`,
        `--stake-pool-verification-key ${stakePoolVerificationKey}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key, cold-verification-key-file and out-file', () => {
    const stakeVerificationKey = 'vkey';
    const coldVerificationKeyFile = 'cold-vkey-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .delegationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKey(stakeVerificationKey))
            .withStakePoolComponent((builder) => builder.coldVerificationKeyFile(coldVerificationKeyFile))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address delegation-certificate',
        `--stake-verification-key ${stakeVerificationKey}`,
        `--cold-verification-key-file ${coldVerificationKeyFile}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key, stake-pool-id  and out-file', () => {
    const stakeVerificationKey = 'vkey';
    const stakePoolId = 'my-stake-pool-id';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .delegationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKey(stakeVerificationKey))
            .withStakePoolComponent((builder) => builder.poolId(stakePoolId))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address delegation-certificate',
        `--stake-verification-key ${stakeVerificationKey}`,
        `--stake-pool-id ${stakePoolId}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key-file , stake-pool-verification-key and out-file', () => {
    const stakeVerificationKeyFile = 'vkey-file';
    const stakePoolVerificationKey = 'pool-vkey';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .delegationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKeyFile(stakeVerificationKeyFile))
            .withStakePoolComponent((builder) => builder.verificationKey(stakePoolVerificationKey))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address delegation-certificate',
        `--stake-verification-key-file ${stakeVerificationKeyFile}`,
        `--stake-pool-verification-key ${stakePoolVerificationKey}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-script-file, stake-pool-verification-key and out-file', () => {
    const stakeScriptFile = 'my-script-file';
    const stakePoolVerificationKey = 'pool-vkey';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .delegationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.scriptFile(stakeScriptFile))
            .withStakePoolComponent((builder) => builder.verificationKey(stakePoolVerificationKey))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address delegation-certificate',
        `--stake-script-file ${stakeScriptFile}`,
        `--stake-pool-verification-key ${stakePoolVerificationKey}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });
});
