import {
  Builder,
  Command,
  CommandOptions,
  Network,
  NetworkBuilder,
  OutFile,
  OutFileBuilder,
} from '@zodimo/cardano-cli-base';
import { StakeComponent, StakeComponentBuilder } from './stake-component';

export class BuildOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private network?: Network;
  private outFile?: OutFile;

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): BuildOptions;
  withStakeComponent(value: StakeComponent): BuildOptions;
  withStakeComponent(value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>): BuildOptions {
    if (value instanceof StakeComponent) {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withNetwork(builder: Builder<NetworkBuilder, Network>): BuildOptions;
  withNetwork(value: Network): BuildOptions;
  withNetwork(value: Network | Builder<NetworkBuilder, Network>): BuildOptions {
    if (value instanceof Network) {
      this.network = value;
      return this;
    }

    this.network = value(new NetworkBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): BuildOptions;
  withOutFile(value: OutFile): BuildOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): BuildOptions {
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
