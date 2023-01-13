import {
  Builder,
  Command,
  CommandOptions,
  CompositeCommandParameter,
  OutFile,
  OutFileBuilder,
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

export class StakeComponent extends CompositeCommandParameter {
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
export class RegistrationCertificateOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private outFile?: OutFile;

  withStakeComponent(value: StakeComponent): RegistrationCertificateOptions {
    this.stakeComponent = value;
    return this;
  }

  withStakeComponentBuilder(builder: Builder<StakeComponentBuilder, StakeComponent>): RegistrationCertificateOptions {
    this.stakeComponent = builder(new StakeComponentBuilder());
    return this;
  }

  withOutFile(value: OutFile): RegistrationCertificateOptions {
    this.outFile = value;
    return this;
  }

  withOutFileBuilder(builder: Builder<OutFileBuilder, OutFile>): RegistrationCertificateOptions {
    this.outFile = builder(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.stakeComponent) {
      output.push(this.stakeComponent.toString());
    }

    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class RegistrationCertificate extends Command<RegistrationCertificateOptions> {
  getCommandName(): string {
    return 'registration-certificate';
  }
}
