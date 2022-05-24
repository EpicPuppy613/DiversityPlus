#! /usr/bin/env node
const readline = require('readline-sync');
const os = require('os');
const homedir = os.homedir();
const chalk = require('chalk');
const clone = require('git-clone');
const args = process.argv.slice(2);
const fs = require('fs');
var mcdir = homedir + "\\AppData\\Roaming\\.minecraft";

if (args[0] == "install") {
    console.log(`${chalk.hex("#FFFFFF")("-- [")}${chalk.hex("#FF3322")("Sigma+")} ${chalk.hex("#22AAFF")("Installer")}${chalk.hex("#FFFFFF")("] --")}`);
    console.log(chalk.cyan("Sigma+ is a community driven modular Minecraft map."));
    console.log(chalk.red("Your current Minecraft install directory is " + homedir + "\\AppData\\Roaming\\.minecraft"));
    var correct = readline.keyInYNStrict(chalk.greenBright("Is this correct?"));
    while (!correct) {
        mcdir = readline.question(chalk.cyan("Please enter the correct Minecraft directory: "));
        console.log(chalk.red("Your current Minecraft install directory is " + mcdir));
        correct = readline.keyInYNStrict(chalk.greenBright("Is this correct?"));
    }
    if (readline.keyInYNStrict(chalk.blueBright("Do you want to install Sigma+?"))) {
        try {
            fs.accessSync(mcdir + "\\saves\\SigmaPlus");
            overwrite = readline.keyInYNStrict(chalk.red("Sigma+ is already installed in this directory, do you want to overwrite it?"));
            if (overwrite) {
                fs.rmSync(mcdir + "\\saves\\SigmaPlus", { recursive: true, force: true });
            }
        } catch {overwrite = true;}
        fs.mkdirSync(mcdir + "\\saves\\SigmaPlus");
        if (!overwrite) {
            console.warn(chalk.hex("#dddd22")("Sigma+ will not be installed."));
            process.exit(0);
        }
        console.log(chalk.greenBright("Cloning Sigma+..."));
        clone('https://github.com/EpicPuppy613/SigmaPlus.git', mcdir + "\\saves\\SigmaPlus", function (err) {
            if (err) {
                console.log(chalk.red("Error: " + err));
                process.exit(1);
            }
            console.log(chalk.greenBright("Sigma+ has been installed."));
            process.exit(0);
        });
    }
    else {
        console.warn(chalk.hex("#dddd22")("Sigma+ will not be installed."));
        process.exit(0);
    }
}
else {
    console.error(chalk.redBright("Invalid command."));
    process.exit(1);
}