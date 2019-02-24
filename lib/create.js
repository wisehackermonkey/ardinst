/*
 helper library for creating folders for my ardinst project
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/
var fs = require('fs-extra')
let mkdirp = require('mkdirp');

let c = console;

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
    fs.open(file_name, "w", (err, file) => {
        if (err) {
            throw err;
        }
        console.log(`Successfully Created File ${file_name}`);
    });
}

// recursively delete folder and contents
// copied form stackoverflow comment
// https://stackoverflow.com/a/32197381
let delete_recursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                delete_recursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

exports.delete = function (path) {
    c.log(fs.resolve(path));
    fs.removeSync(path);
}