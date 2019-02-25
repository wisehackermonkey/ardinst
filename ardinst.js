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
    .version('1.0.0')
    .command('install [name]', 'install one or more packages')
    .command('search [query]', 'search with optional query')
    // .command('list', 'list packages installed', {isDefault: true})
    .parse(process.argv);