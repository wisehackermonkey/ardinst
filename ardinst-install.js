const program = require('commander');
const create = require("./lib/create");


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
    child.on('exit', () => {
        console.log(`install finished`);
        create.symlik(library);
        console.log(`symlink created`);
    });
});
console.log();