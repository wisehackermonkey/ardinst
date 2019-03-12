/*
 list packages installed from ardinst
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190312
*/


const program = require('commander');
const create = require("./lib/create");


program.parse(process.argv);

let list = program.args;

if (list.length) {
    console.log("list does not take argument's");
}

console.log();

console.log(`listing`);
console.log(`Please wait..`);
let result = create.list();
console.log(result);
console.log(`list complete`);

console.log();
