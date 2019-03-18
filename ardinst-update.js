/*
 update libraries from cli
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190301
*/
const program = require('commander');
const create = require("./lib/create");


program.parse(process.argv);

let library = program.args;

if (!library.length) {
    console.error('package name required');
    process.exit(1);
}

console.log();

library.forEach(function (library_name) {
    console.log(`       update : ${library_name}`);
    try {
        console.log(create.update(library_name));
        console.log(`Update to ${library_name} has been ran`);
    }catch (e) {
        console.log(`Package "${library_name}" in not installed`);
        console.log(`did you mean? 'ardinst update ${library_name}`);
        console.log(`ERROR: ${e}`);
    }
});
console.log();