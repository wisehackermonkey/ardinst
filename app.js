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

create.folder("./project/src");
create.folder("./project/examples");
create.file("./project/library.properties");

//testing cleanup
create.delete("./project");
