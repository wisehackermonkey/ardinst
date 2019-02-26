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

exports.arduino_path = function(custom_optional_path){

  // TODO add cross platform
  //  TODO add path.normalize to custom_optional_path
    let arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries");
    return  (typeof(custom_optional_path) === "undefined")? arduino_folder : custom_optional_path;
};

exports.node_path = function(custom_optional_path){

    // TODO add cross platform
    //  TODO add path.normalize to custom_optional_path
    let node_folder = path.join(prefix, "node_modules");
    return  (typeof(custom_optional_path) === "undefined")? node_folder : custom_optional_path;
};



exports.symlink = function (library_name) {
    // TODO add mac defult path node_mondule'/usr/local/lib/node_modules'
    // TODO add mac default arduino path
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
            // TODO have client class handle this code
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
    let child = exec(`npm install -g ${name}`);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stdout);
    return child;

};

exports.uninstall = function (name) {
    console.log(`${name}`);

    let arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries", name);

    if(!fs.existsSync(arduino_folder)){
        throw `Symlink does not exist: ${arduino_folder}`;
    }
    fs.unlinkSync(arduino_folder);

    // 'npm uninstall -g <package-name>'
    let child = exec(`npm uninstall -g ${name}`);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stdout);
    return child;
};

//TODO fix broaken delete
exports.delete = function (path_to_delete) {
    console.log("TODO DELETE");
    // let os_indepented_path = path.resolve(path_to_delete).toString();
    // console.log(os_indepented_path);
    // let opt = {};
    // opt["maxBusyTries"] = 5;
    //
    // rimraf(path_to_delete, opt, (err) => {
    //     console.log(err);
    // });
};