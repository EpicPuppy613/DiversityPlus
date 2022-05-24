#! /usr/bin/env node

/*

Sigma+
Copyright (C) 2022 EpicPuppy613

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
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
    console.log('Sigma+  Copyright (C) 2022  EpicPuppy613');
    console.log(chalk.cyanBright("Sigma+ is a community driven modular Minecraft map."));
    console.log(chalk.redBright("Your current Minecraft install directory is " + homedir + "\\AppData\\Roaming\\.minecraft"));
    var correct = readline.keyInYNStrict(chalk.greenBright("Is this correct?"));
    while (!correct) {
        mcdir = readline.question(chalk.cyan("Please enter the correct Minecraft directory: "));
        console.log(chalk.redBright("Your current Minecraft install directory is " + mcdir));
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
        try {
            fs.mkdirSync(mcdir + "\\saves\\SigmaPlus");
        } catch {
            console.error(chalk.red("Could not create Sigma+ directory, please check your permissions or install Minecraft."));
            process.exit(1);
        }
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
            console.log(chalk.green("Successfully cloned Sigma+."));
            console.log(chalk.greenBright("Thank you for installing Sigma+!"));
            console.log(chalk.cyan("It should now appear in your world select menu."));
            console.log(chalk.cyanBright("You might have to restart Minecraft to see it."));
            console.log(chalk.yellowBright("You can install branches using ") + chalk.yellowBright.inverse.bold("npx sigma-plus branch install <branch-url>"));
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