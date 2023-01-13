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

  build(builder: Builder<BuildOptions, BuildOptions>): Build;
  build(options: BuildOptions): Build;
  build(value: BuildOptions | Builder<BuildOptions, BuildOptions>): Build {
    if (value instanceof BuildOptions) {
      return new Build(this.commandPrefix, value);
    }

    const options = value(new BuildOptions());
    return this.build(options);
  }

  // key-hash
  keyHash(builder: Builder<KeyHashOptions, KeyHashOptions>): KeyHash;
  keyHash(options: KeyHashOptions): KeyHash;
  keyHash(value: KeyHashOptions | Builder<KeyHashOptions, KeyHashOptions>): KeyHash {
    if (value instanceof KeyHashOptions) {
      return new KeyHash(this.commandPrefix, value);
    }

    const options = value(new KeyHashOptions());
    return this.keyHash(options);
  }

  // registration-certificate
  registrationCertificate(
    builder: Builder<RegistrationCertificateOptions, RegistrationCertificateOptions>,
  ): RegistrationCertificate;
  registrationCertificate(options: RegistrationCertificateOptions): RegistrationCertificate;
  registrationCertificate(
    value: RegistrationCertificateOptions | Builder<RegistrationCertificateOptions, RegistrationCertificateOptions>,
  ): RegistrationCertificate {
    if (value instanceof RegistrationCertificateOptions) {
      return new RegistrationCertificate(this.commandPrefix, value);
    }

    const options = value(new RegistrationCertificateOptions());
    return this.registrationCertificate(options);
  }

  // deregistration-certificate

  deregistrationCertificate(
    builder: Builder<DeregistrationCertificateOptions, DeregistrationCertificateOptions>,
  ): DeregistrationCertificate;
  deregistrationCertificate(options: DeregistrationCertificateOptions): DeregistrationCertificate;
  deregistrationCertificate(
    value:
      | DeregistrationCertificateOptions
      | Builder<DeregistrationCertificateOptions, DeregistrationCertificateOptions>,
  ): DeregistrationCertificate {
    if (value instanceof DeregistrationCertificateOptions) {
      return new DeregistrationCertificate(this.commandPrefix, value);
    }

    const options = value(new DeregistrationCertificateOptions());
    return this.deregistrationCertificate(options);
  }

  // delegation-certificate

  delegationCertificate(
    builder: Builder<DelegationCertificateOptions, DelegationCertificateOptions>,
  ): DelegationCertificate;
  delegationCertificate(options: DelegationCertificateOptions): DelegationCertificate;
  delegationCertificate(
    value: DelegationCertificateOptions | Builder<DelegationCertificateOptions, DelegationCertificateOptions>,
  ): DelegationCertificate {
    if (value instanceof DelegationCertificateOptions) {
      return new DelegationCertificate(this.commandPrefix, value);
    }

    const options = value(new DelegationCertificateOptions());
    return this.delegationCertificate(options);
  }
}
