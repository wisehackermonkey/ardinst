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
let create = require("./lib/create");

//Create project directory structure
create.folder("./project/src");
create.folder("./project/examples");
create.folder("./project/");

//Generate project template files
create.file("./project/library.properties");
create.file("./project/README.md");
create.file('./project/keywords.txt');


let package = "arduino-bounce2";
let child = create.install(package);

//wait for process to finish before continuin
// found from stack overflow https://stackoverflow.com/a/22365830
child.on('exit', function() {

    //create symlink to arduino folder
    console.log("Creating symlink");
    try{
        create.symlik(package);
    }catch (e) {
        if (e === "library") {
            console.log(`ERROR: could not create symlink, library '${package} is not installed'`);
            console.log(`cleaning up aborted install... `);
            create.uninstall(package);

        }
    }

});

// find more info on Graceful shutdown in NodeJS
//https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    process.exit(0);
});