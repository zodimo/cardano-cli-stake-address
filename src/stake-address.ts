import { Builder } from '@zodimo/cardano-cli-base';
import { Build, BuildOptions } from './command/build';
import { DelegationCertificate, DelegationCertificateOptions } from './command/delegation-certificate';
import { DeregistrationCertificate, DeregistrationCertificateOptions } from './command/deregistration-certificate';
import { KeyGen, KeyGenOptions } from './command/key-gen';
import { KeyHash, KeyHashOptions } from './command/key-hash';
import { RegistrationCertificate, RegistrationCertificateOptions } from './command/registration-certificate';

export class StakeAddress {
  public readonly commandPrefix: string;
  constructor(commandPrefix: string) {
    this.commandPrefix = `${commandPrefix} stake-address`;
  }

  static createWithCardanoCliBin(cardniCliBinPath = 'cardano-cli'): StakeAddress {
    return new StakeAddress(cardniCliBinPath);
  }

  // key-gen

  keyGen(builder: Builder<KeyGenOptions, KeyGenOptions>): KeyGen;
  keyGen(options: KeyGenOptions): KeyGen;
  keyGen(value: KeyGenOptions | Builder<KeyGenOptions, KeyGenOptions>): KeyGen {
    if (value instanceof KeyGenOptions) {
      return new KeyGen(this.commandPrefix, value);
    }

    const options = value(new KeyGenOptions());
    return this.keyGen(options);
  }

  // build

  build(options: BuildOptions): Build {
    return new Build(this.commandPrefix, options);
  }

  buildBuilder(builder: Builder<BuildOptions, BuildOptions>): Build {
    const options = builder(new BuildOptions());
    return this.build(options);
  }

  // key-hash

  keyHash(options: KeyHashOptions): KeyHash {
    return new KeyHash(this.commandPrefix, options);
  }

  keyHashBuilder(builder: Builder<KeyHashOptions, KeyHashOptions>): KeyHash {
    const options = builder(new KeyHashOptions());
    return this.keyHash(options);
  }

  // registration-certificate

  registrationCertificate(options: RegistrationCertificateOptions): RegistrationCertificate {
    return new RegistrationCertificate(this.commandPrefix, options);
  }

  registrationCertificateBuilder(
    builder: Builder<RegistrationCertificateOptions, RegistrationCertificateOptions>,
  ): RegistrationCertificate {
    const options = builder(new RegistrationCertificateOptions());
    return this.registrationCertificate(options);
  }

  // deregistration-certificate

  deregistrationCertificate(options: DeregistrationCertificateOptions): DeregistrationCertificate {
    return new DeregistrationCertificate(this.commandPrefix, options);
  }

  deregistrationCertificateBuilder(
    builder: Builder<DeregistrationCertificateOptions, DeregistrationCertificateOptions>,
  ): DeregistrationCertificate {
    const options = builder(new DeregistrationCertificateOptions());
    return this.deregistrationCertificate(options);
  }

  // delegation-certificate

  delegationCertificate(options: DelegationCertificateOptions): DelegationCertificate {
    return new DelegationCertificate(this.commandPrefix, options);
  }

  delegationCertificateBuilder(
    builder: Builder<DelegationCertificateOptions, DelegationCertificateOptions>,
  ): DelegationCertificate {
    const options = builder(new DelegationCertificateOptions());
    return this.delegationCertificate(options);
  }
}
