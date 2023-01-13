import { StakeAddress } from '../../src/stake-address';

describe('cardano-cli stake-address key-gen', () => {
  /*
  Usage: cardano-cli stake-address key-gen --verification-key-file FILE
            --signing-key-file FILE
  */
  it('key-gen', () => {
    const verificationKeyFile = 'vkey';
    const signingKeyFile = 'skey';
    expect(
      StakeAddress.createWithCardanoCliBin()
        .keyGen((builder) => builder.withVerificationKeyFile(verificationKeyFile).withSigningKeyFile(signingKeyFile))
        .getCommand(),
    ).toBe(
      [
        'cardano-cli stake-address key-gen',
        `--verification-key-file ${verificationKeyFile}`,
        `--signing-key-file ${signingKeyFile}`,
      ].join(' '),
    );
  });
});
