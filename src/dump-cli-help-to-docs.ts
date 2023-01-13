import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

class DumpRawHelpDocs {
  private rawDocPath: string;
  constructor(private cliPath: string) {
    this.rawDocPath = path.resolve('docs/raw-help');
    this.ensureDirectoryExists(this.rawDocPath);
  }

  createDocFileForCommands(...commands: string[]): [string, string] {
    return [path.join(this.rawDocPath, `${commands.join('_')}.txt`), commands.join(' ')];
  }

  getCommandFileMapping(): Map<string, string> {
    const commandMapping: Map<string, string> = new Map();

    //stake-address
    return commandMapping
      .set(...this.createDocFileForCommands('stake-address'))
      .set(...this.createDocFileForCommands('stake-address', 'key-gen'))
      .set(...this.createDocFileForCommands('stake-address', 'build'))
      .set(...this.createDocFileForCommands('stake-address', 'key-hash'))
      .set(...this.createDocFileForCommands('stake-address', 'registration-certificate'))
      .set(...this.createDocFileForCommands('stake-address', 'deregistration-certificate'))
      .set(...this.createDocFileForCommands('stake-address', 'delegation-certificate'));
  }

  generate(): void {
    const commandsToRun = this.getCommandFileMapping();
    // file command=>file

    commandsToRun.forEach((command: string, docPath: string) => {
      const result = this.runCommand(`${this.cliPath} ${command} -h`);
      console.log(`writing command: ${command} to file: ${docPath}`);
      fs.writeFileSync(docPath, result);
    });
  }

  ensureDirectoryExists(path: string) {
    if (!fs.existsSync(path)) this.runCommand(`mkdir -p ${path}`);
  }

  runCommand: (command: string) => string = (command: string) => {
    return execSync(command).toString();
  };
}

new DumpRawHelpDocs('cardano-cli').generate();
