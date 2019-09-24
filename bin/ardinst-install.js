/*
 install arduino npm packages
 'ardinst instal <package-name>'
 downloads npm package <package-name>
 and creates a symlink to the arduino libraries folder
 For window the path is C:\Users\<USER_NAME>>\Documents\Arduino\libraries
 For Mac the path is
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/

const program = require('commander');
const create = require("./create");


program
    .option('-f, --force', 'force installation')
    .parse(process.argv);

let pkgs = program.args;

if (!pkgs.length) {
    console.error('packages required');
    process.exit(1);
}

console.log();
if (program.force) console.log('  force: install');
pkgs.forEach(function (library) {
    console.log(`       install : ${library}`);
    let child = create.install(library);
    console.log(`After install`);
    // child.on('exit', () => {
        console.log(`install finished`);
        create.symlink(library);
        console.log(`symlink created`);
    // });
});
console.log();