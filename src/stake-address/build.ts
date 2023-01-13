import {
  Builder,
  Command,
  CommandOptions,
  Network,
  NetworkBuilder,
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

export class BuildOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private network?: Network;
  private outFile?: OutFile;

  withStakeComponent(value: StakeComponent): BuildOptions {
    this.stakeComponent = value;
    return this;
  }

  withStakeComponentBuilder(builder: Builder<StakeComponentBuilder, StakeComponent>): BuildOptions {
    this.stakeComponent = builder(new StakeComponentBuilder());
    return this;
  }

  withNetwork(value: Network): BuildOptions {
    this.network = value;
    return this;
  }

  withNetworkBuilder(builder: Builder<NetworkBuilder, Network>): BuildOptions {
    this.network = builder(new NetworkBuilder());
    return this;
  }

  withOutFile(value: OutFile): BuildOptions {
    this.outFile = value;
    return this;
  }

  withOutFileBuilder(builder: Builder<OutFileBuilder, OutFile>): BuildOptions {
    this.outFile = builder(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];

    if (this.stakeComponent) {
      output.push(this.stakeComponent.toString());
    }
    if (this.network) {
      output.push(this.network.toString());
    }
    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class Build extends Command<BuildOptions> {
  getCommandName(): string {
    return 'build';
  }
}
