/*
 uninstall packages by specifying package name
 'ardinst uninstall <packagename>
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
const program = require('commander');
const create = require("./create");


program.parse(process.argv);

let library = program.args;

if (!library.length) {
    console.error('package name required');
    process.exit(1);
}

console.log();

library.forEach(function (package_name) {
    console.log(`       uninstall : ${package_name}`);
    try {
        create.uninstall(package_name);
    }catch (e) {
        console.log(`Package "${package_name}" in not installed`);
        console.log(`did you mean? 'ardinst install ${package_name}`);
        console.log(`ERROR: ${e}`);
    }
});
console.log();