import {
  Builder,
  Command,
  CommandOptions,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';

export enum StakeComponents {
  VERIFICATION_KEY = 'stake-verification-key',
  VERIFICATION_KEY_FILE = 'stake-verification-key-file',
  SCRIPT_FILE = 'script-file',
}

export class StakeComponentBuilder {
  verificationKey(value: string): StakeComponent {
    return StakeComponent.verificationKey(value);
  }
  verificationKeyFile(value: string): StakeComponent {
    return StakeComponent.verificationKeyFile(value);
  }
  scriptFile(value: string): StakeComponent {
    return StakeComponent.scriptFile(value);
  }
}

export class StakeComponent extends StringCommandParameter {
  constructor(paramKey: StakeComponents, paramValue: string) {
    super(paramKey, paramValue);
  }
  static verificationKey(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.VERIFICATION_KEY, value);
  }
  static verificationKeyFile(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.VERIFICATION_KEY_FILE, value);
  }
  static scriptFile(value: string): StakeComponent {
    return new StakeComponent(StakeComponents.SCRIPT_FILE, value);
  }
}

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

  withStakeComponent(value: StakeComponent): DelegationCertificateOptions {
    this.stakeComponent = value;
    return this;
  }

  withStakeComponentBuilder(builder: Builder<StakeComponentBuilder, StakeComponent>): DelegationCertificateOptions {
    this.stakeComponent = builder(new StakeComponentBuilder());
    return this;
  }

  withStakePoolComponent(value: StakePoolComponent): DelegationCertificateOptions {
    this.stakePoolComponent = value;
    return this;
  }

  withStakePoolComponentBuilder(
    builder: Builder<StakePoolComponentBuilder, StakePoolComponent>,
  ): DelegationCertificateOptions {
    this.stakePoolComponent = builder(new StakePoolComponentBuilder());
    return this;
  }

  withOutFile(value: OutFile): DelegationCertificateOptions {
    this.outFile = value;
    return this;
  }

  withOutFileBuilder(builder: Builder<OutFileBuilder, OutFile>): DelegationCertificateOptions {
    this.outFile = builder(new OutFileBuilder());
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
