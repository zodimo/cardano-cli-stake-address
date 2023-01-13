import {
  Builder,
  Command,
  CommandOptions,
  OutFile,
  OutFileBuilder,
  StringCommandParameter,
} from '@zodimo/cardano-cli-base';

export enum StakeVerificationKeyOptions {
  VALUE = 'stake-verification-key',
  FILE = 'stake-verification-key-file',
}

export class StakeVerificationKeyFactory {
  value(value: string): StakeVerificationKey {
    return StakeVerificationKey.value(value);
  }
  file(value: string): StakeVerificationKey {
    return StakeVerificationKey.file(value);
  }
}

export class StakeVerificationKey extends StringCommandParameter {
  constructor(paramKey: StakeVerificationKeyOptions, paramValue: string) {
    super(paramKey, paramValue);
  }
  static value(value: string): StakeVerificationKey {
    //--stake-verification-key STRING
    return new StakeVerificationKey(StakeVerificationKeyOptions.VALUE, value);
  }
  static file(value: string): StakeVerificationKey {
    // --stake-verification-key-file FILE
    return new StakeVerificationKey(StakeVerificationKeyOptions.FILE, value);
  }
}

export class KeyHashOptions implements CommandOptions {
  private stakeVerificationKey?: StakeVerificationKey;
  private outFile?: OutFile;

  withStakeVerificationKey(value: StakeVerificationKey): KeyHashOptions {
    this.stakeVerificationKey = value;
    return this;
  }

  withStakeVerificationKeyBuilder(builder: Builder<StakeVerificationKeyFactory, StakeVerificationKey>): KeyHashOptions {
    this.stakeVerificationKey = builder(new StakeVerificationKeyFactory());
    return this;
  }

  withOutFile(value: OutFile): KeyHashOptions {
    this.outFile = value;
    return this;
  }

  withOutFileBuilder(builder: Builder<OutFileBuilder, OutFile>): KeyHashOptions {
    this.outFile = builder(new OutFileBuilder());
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.stakeVerificationKey) {
      output.push(this.stakeVerificationKey.toString());
    }
    if (this.outFile) {
      output.push(this.outFile.toString());
    }

    return output.join(' ');
  }
}

export class KeyHash extends Command<KeyHashOptions> {
  getCommandName(): string {
    return 'key-hash';
  }
}
