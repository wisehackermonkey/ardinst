/*
 search for npm packages that are compatable with ardinst
 'arduino-<package_name>'
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
//TODO flesh out search function
const program = require('commander');
const create = require("./create");


program.parse(process.argv);

let library = program.args;

if (!library.length) {
    console.error('package name required');
    process.exit(1);
}

console.log();

library.forEach(function (library_name) {
    console.log(`       search : arduino-${library_name}`);
    console.log(create.search(library_name));
    console.log(`search arduino-${library_name} has been ran`);
});
console.log();