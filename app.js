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


create.install("arduino-bounce2");

//create symlink to arduino folder
// console.log("Creating symlink");
// create.symlik("/test","arduino-bounce2");
