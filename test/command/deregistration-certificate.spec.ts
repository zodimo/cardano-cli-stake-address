import { StakeAddress } from '../../src/stake-address';

describe('cardano-cli stake-address deregistration-certificate', () => {
  /*
  Usage: cardano-cli stake-address deregistration-certificate 
            ( --stake-verification-key STRING
            | --stake-verification-key-file FILE
            | --stake-script-file FILE
            )
            --out-file FILE
 */

  it('stake-verification-key with out-file', () => {
    const stakeVerificationKey = 'vkey';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .deregistrationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKey(stakeVerificationKey))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address deregistration-certificate',
        `--stake-verification-key ${stakeVerificationKey}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-verification-key-file, mainnet with out-file', () => {
    const stakeVerificationKeyFile = 'vkey-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .deregistrationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.verificationKeyFile(stakeVerificationKeyFile))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address deregistration-certificate',
        `--stake-verification-key-file ${stakeVerificationKeyFile}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });

  it('stake-script-file, testnetMagic with out-file', () => {
    const stakeScriptFile = 'script-file';
    const outFileName = 'my-out-file';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .deregistrationCertificate((builder) =>
          builder
            .withStakeComponent((builder) => builder.scriptFile(stakeScriptFile))
            .withOutFile((builder) => builder.createForFile(outFileName)),
        )
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address deregistration-certificate',
        `--stake-script-file ${stakeScriptFile}`,
        `--out-file ${outFileName}`,
      ].join(' '),
    );
  });
});
