import { Builder, Command, CommandOptions, OutFile, OutFileBuilder } from '@zodimo/cardano-cli-base';
import { StakeComponent, StakeComponentBuilder } from './stake-component';

export class RegistrationCertificateOptions implements CommandOptions {
  private stakeComponent?: StakeComponent;
  private outFile?: OutFile;

  withStakeComponent(builder: Builder<StakeComponentBuilder, StakeComponent>): RegistrationCertificateOptions;
  withStakeComponent(value: StakeComponent): RegistrationCertificateOptions;
  withStakeComponent(
    value: StakeComponent | Builder<StakeComponentBuilder, StakeComponent>,
  ): RegistrationCertificateOptions {
    if (typeof value !== 'function') {
      this.stakeComponent = value;
      return this;
    }

    this.stakeComponent = value(new StakeComponentBuilder());
    return this;
  }

  withOutFile(builder: Builder<OutFileBuilder, OutFile>): RegistrationCertificateOptions;
  withOutFile(value: OutFile): RegistrationCertificateOptions;
  withOutFile(value: OutFile | Builder<OutFileBuilder, OutFile>): RegistrationCertificateOptions {
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

export class RegistrationCertificate extends Command<RegistrationCertificateOptions> {
  getCommandName(): string {
    return 'registration-certificate';
  }
}
