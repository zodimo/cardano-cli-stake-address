import {
  Builder,
  Command,
  CommandOptions,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';
import { StakeComponent, StakeComponentBuilder } from './stake-component';

export enum StakePoolComponents {
  VERIFICATION_KEY = 'stake-pool-verification-key',
  COLD_VERIFICATION_KEY_FILE = 'cold-verification-key-file',
  POOL_ID = 'stake-pool-id',
}

export class StakePoolComponentBuilder {
  verificationKey(value: string): StakePoolComponent {
    return StakePoolComponent.verificationKey(value);
  }
  coldVerificationKeyFile(value: string): StakePoolComponent {
    return StakePoolComponent.coldVerificationKeyFile(value);
  }
  poolId(value: string): StakePoolComponent {
    return StakePoolComponent.poolId(value);
  }
}

export class StakePoolComponent extends StringCommandParameter {
  constructor(paramKey: StakePoolComponents, paramValue: string) {
    super(paramKey, paramValue);
  }
  static verificationKey(value: string): StakePoolComponent {
    return new StakePoolComponent(StakePoolComponents.VERIFICATION_KEY, value);
  }
  static coldVerificationKeyFile(value: string): StakePoolComponent {
    return new StakePoolComponent(StakePoolComponents.COLD_VERIFICATION_KEY_FILE, value);
  }
  static poolId(value: string): StakePoolComponent {
    return new StakePoolComponent(StakePoolComponents.POOL_ID, value);
  }
}

export class DelegationCertificateOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private stakePoolComponent?: StakePoolComponent;
  private outFile?: OutFile;

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): DelegationCertificateOptions;
  withStakeComponent(value: StakeComponent): DelegationCertificateOptions;
  withStakeComponent(
    value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>,
  ): DelegationCertificateOptions {
    if (value instanceof StakeComponent) {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withStakePoolComponent(builder: Builder<StakePoolComponentBuilder, StakePoolComponent>): DelegationCertificateOptions;
  withStakePoolComponent(value: StakePoolComponent): DelegationCertificateOptions;
  withStakePoolComponent(
    value: StakePoolComponent | Builder<StakePoolComponentBuilder, StakePoolComponent>,
  ): DelegationCertificateOptions {
    if (value instanceof StakePoolComponent) {
      this.stakePoolComponent = value;
      return this;
    }

    this.stakePoolComponent = value(new StakePoolComponentBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): DelegationCertificateOptions;
  withOutFile(value: OutFile): DelegationCertificateOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): DelegationCertificateOptions {
    if (value instanceof OutFile) {
      this.outFile = value;
      return this;
    }
    this.outFile = value(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.stakeComponent) {
      output.push(this.stakeComponent.toString());
    }

    if (this.stakePoolComponent) {
      output.push(this.stakePoolComponent.toString());
    }

    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class DelegationCertificate extends Command<DelegationCertificateOptions> {
  getCommandName(): string {
    return 'delegation-certificate';
  }
}
