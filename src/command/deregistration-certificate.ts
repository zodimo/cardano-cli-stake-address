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
  SCRIPT_FILE = 'stake-script-file',
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
export class DeregistrationCertificateOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private outFile?: OutFile;

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): DeregistrationCertificateOptions;
  withStakeComponent(value: StakeComponent): DeregistrationCertificateOptions;
  withStakeComponent(
    value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>,
  ): DeregistrationCertificateOptions {
    if (value instanceof StakeComponent) {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): DeregistrationCertificateOptions;
  withOutFile(value: OutFile): DeregistrationCertificateOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): DeregistrationCertificateOptions {
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

    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class DeregistrationCertificate extends Command<DeregistrationCertificateOptions> {
  getCommandName(): string {
    return 'deregistration-certificate';
  }
}
