/*
 helper library for creating folders for my ardinst project
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
const path = require('path');
let fs = require('fs');
let rimraf = require('rimraf');
let mkdirp = require('mkdirp');


// create folder or levels of folders by specifiing path
// example creates the full path of folders
// ./path/to/folder
// creates folder
//  ./path
//      /to
//          /folder
exports.folder = function (dir_name) {
    if (!fs.existsSync(dir_name)) {
        mkdirp.sync(dir_name);
        console.log(`Successfully created ${dir_name}`)
    } else {
        console.error(`Error: Folder ${dir_name} already exists`)
    }
};

exports.file = function (file_name) {
    fs.openSync(file_name, "w", (err) => {
        if (err) {
            throw err;
        }
        console.log(`Successfully Created File ${file_name}`);
    });
};

//TODO fix
exports.delete = function (path_to_delete) {
    let os_indepented_path = path.resolve(path_to_delete).toString();
    console.log(os_indepented_path);
    let opt = {};
    opt["maxBusyTries"] = 5;

    rimraf(path_to_delete, opt, (err) => {
        console.log(err);
    });
};