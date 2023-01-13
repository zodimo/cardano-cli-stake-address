import { Command, CommandOptions, StringCommandParameter } from '@zodimo/cardano-cli-base';

export class KeyGenOptions implements CommandOptions {
  private verificationKeyFile?: StringCommandParameter;
  private signingKeyFile?: StringCommandParameter;

  withVerificationKeyFile(verificationKeyFile: string): KeyGenOptions {
    this.verificationKeyFile = StringCommandParameter.from('verification-key-file', verificationKeyFile);
    return this;
  }
  withSigningKeyFile(signingKeyFile: string): KeyGenOptions {
    this.signingKeyFile = StringCommandParameter.from('signing-key-file', signingKeyFile);
    return this;
  }

  toString(): string {
    const output: string[] = [];
    if (this.verificationKeyFile) {
      output.push(this.verificationKeyFile.toString());
    }
    if (this.signingKeyFile) {
      output.push(this.signingKeyFile.toString());
    }

    return output.join(' ');
  }
}

export class KeyGen extends Command<KeyGenOptions> {
  getCommandName(): string {
    return 'key-gen';
  }
}
