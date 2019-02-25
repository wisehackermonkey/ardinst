/*
 helper library for creating folders for my ardinst project
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190224
*/

//Built in packages
const os = require("os");
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

// installed packages
const mkdirp = require('mkdirp');
const prefix = require('global-prefix');


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
exports.symlik = function (library_name) {
    // TODO add mac defult path
    // TODO add support for custom path
    let arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries", library_name);
    let node_folder = path.join(prefix, "node_modules", library_name);

    if (!fs.existsSync(node_folder)) {
        throw "library";
    }

    try {
        if (!fs.existsSync(arduino_folder)) {
            fs.symlinkSync(node_folder, arduino_folder, 'dir');
            console.log(`Successfully created symlink between '${node_folder}' <===> '${arduino_folder}'`);
        } else {
            console.log(`ERROR: create#symlink(): Library "${library_name}" already exists inside arduino library folder - "${arduino_folder}"`);
        }
    } catch (e) {
        if (e.code === "EPERM") {
            throw "ERROR: could not create symlink, if on Windows Try running ardinst as Administrator in cmd.exe or powershell.exe";
        }
        if (e === "library") {
            console.log(`WORKS ${e.code}`);
            throw 'library'
        }
        console.log(`ERROR: "${e}"`);
        return 1;
    }

};


exports.install = function (name) {
    console.log(`${name}`);
    // 'npm install -g <package-name>'
    let child = exec(`npm install -g ${name}`);//.stdout.pipe(process.stdout);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stdout);
    return child;

};

exports.uninstall = function (name) {
    console.log(`${name}`);
    // 'npm uninstall -g <package-name>'
    exec(`npm uninstall -g ${name}`).stdout.pipe(process.stdout);
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