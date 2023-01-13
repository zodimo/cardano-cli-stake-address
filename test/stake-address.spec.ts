import { StakeAddress } from '../src/stake-address';

describe('cardano-cli stake-address', () => {
  /*
  Usage: cardano-cli address (key-gen | key-hash | build | build-script | info)
  */
  it('default commandPrefix', () => {
    expect(StakeAddress.createWithCardanoCliBin().commandPrefix).toBe('cardano-cli stake-address');
  });

  it('can change cliBinPath commandPrefix', () => {
    expect(StakeAddress.createWithCardanoCliBin('cli').commandPrefix).toBe('cli stake-address');
  });
});
