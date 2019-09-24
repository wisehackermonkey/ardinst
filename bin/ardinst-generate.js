/*
 generates arduino library template folder
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
const program = require("commander");

program
    .option("-f --file", "specify template project folder location")
    .parse(process.argv);

let folder = program.args;

console.log();
folder.forEach(function (library) {
    console.log(`       generate : ${library}`);
    let create = require("./create");

    //Create project directory structure
    create.folder(`./${library}/src`);
    create.folder(`./${library}/examples`);

    //Generate project template files
    create.file(`./${library}/library.properties`);
    create.file(`./${library}/README.md`);
    create.file(`./${library}/keywords.txt`);

    // TODO add contents to readme.md, keywords.txt, library.properties
});
console.log();
