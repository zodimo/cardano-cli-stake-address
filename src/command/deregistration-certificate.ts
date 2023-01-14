import { Builder, Command, CommandOptions, OutFile, OutFileBuilder } from '@zodimo/cardano-cli-base';
import { StakeComponent, StakeComponentBuilder } from './stake-component';

export class DeregistrationCertificateOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private outFile?: OutFile;

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): DeregistrationCertificateOptions;
  withStakeComponent(value: StakeComponent): DeregistrationCertificateOptions;
  withStakeComponent(
    value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>,
  ): DeregistrationCertificateOptions {
    if (typeof value !== 'function') {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): DeregistrationCertificateOptions;
  withOutFile(value: OutFile): DeregistrationCertificateOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): DeregistrationCertificateOptions {
    if (typeof value !== 'function') {
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
