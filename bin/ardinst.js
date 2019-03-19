#! /usr/bin/env node --harmony
/*
 Ardinst is a package manager for ardiuno libraries
 DESCRIPTION
 it leverages npm package manager to install and upload packages
 to npmjs.org and allows fast development of arduino projects
 by allowing quick install of awesome libraries
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
const program = require("commander");

// TODO change font
console.log(`
/////////////////////////////////
  ___          _ _           _
 / _ \\        | (_)         | |
/ /_\\ \\_ __ __| |_ _ __  ___| |_
|  _  | '__/ _\` | | '_ \\/ __| __|
| | | | | | (_| | | | | \\__ \\ |_
\\_| |_/_|  \\__,_|_|_| |_|___/\\__|
/////////////////////////////////`);
console.log(`Ardinst (arduino install) the arduino package manager`);

program
    .version('1.2.0', '-v, --version')
    .command('install [library]', 'install one or more packages')
    .command('uninstall [library]', 'remove packages by specifing package name, allows for multiple uninstalls at same time')
    .command('search [query]', 'search npm for arduino-* packages')
    .command('generate [folder]', 'generate arduino library file project template')
    .command('update [library]', 'installs newest version of libraries')
    .command('list', 'lists the packages installed')
    .command('publish',"upload's arduino library to npm, with all necessary files")
    .parse(process.argv);