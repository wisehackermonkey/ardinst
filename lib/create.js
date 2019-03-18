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

const globalModules = require('global-modules');

const execSync = require('child_process').execSync;

// installed packages
const mkdirp = require('mkdirp');
const prefix = require('global-prefix');

// finds out what operating system is running
// and returns a friendly name
exports.get_os_type = () => {
    switch (os.platform()) {
        case "darwin":
            return "mac";
        case "win32":
            return "windows";
        case "linux":
            return "linux";
    }
};
// create folder or levels of folders by specifiing path
// example creates the full path of folders
// ./path/to/folder
// creates folder
//  ./path
//      /to
//          /folder
exports.folder = (dir_name) => {
    if (fs.existsSync(dir_name)) {
        console.error(`Error: Folder ${dir_name} already exists`)
    } else {
        mkdirp.sync(dir_name);
        console.log(`Successfully created ${dir_name}`)
    }
};

exports.file = (file_name) => {
    fs.openSync(file_name, "w", (err) => {
        if (err) {
            throw err;
        }
        console.log(`Successfully Created File ${file_name}`);
    });
};

exports.arduino_path = (custom_optional_path) => {

    // TODO add cross platform
    //  TODO add path.normalize to custom_optional_path
    let arduino_folder;

    if(exports.get_os_type() === "windows") {
        arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries");
    }else if(exports.get_os_type() === "mac"){
        arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries");
    }else if(exports.get_os_type() === "linux"){
    //    defauts to linux
        arduino_folder = path.join(os.homedir(), "sketchbook", "libraries");
    }

    return  custom_optional_path || arduino_folder;
};

// gets the install path for npm modules that are
// used by arduino
exports.node_path = (custom_optional_path) => {
    return  custom_optional_path || globalModules;
};

exports.new_symlink = (source, description) => {

    if (!fs.existsSync(source)) {
        throw "library";
    }
    if (fs.existsSync(description)) {
        fs.symlinkSync(source, description, 'dir');
    }
};


exports.symlink = (library_name) => {
    let arduino_folder = path.join(arduino_path(), library_name);
    let node_folder = path.join(node_path(), library_name);

    if (fs.existsSync(node_folder)) {
        try {
            if (fs.existsSync(arduino_folder)) {
                console.log(`ERROR: create#symlink(): Library "${library_name}" already exists inside arduino library folder - "${arduino_folder}"`);
            } else {
                fs.symlinkSync(node_folder, arduino_folder, 'dir');
                console.log(`Successfully created symlink between '${node_folder}' <===> '${arduino_folder}'`);
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
    } else {
        throw "library";
    }

};


exports.install = (name) => {
    console.log(`${name}`);
    console.log(`please wait..`);

    // 'npm install -g <package-name>'

    return call_npm_command(` install -g ${name}`)
};

// wrapper around npm's search for ardinst spacific packages
// 'npm search <package-name>'

exports.search = (name) => {
    console.log(`${name}`);
    console.log(`please wait..`);

    // 'npm search <package-name>'
    return call_npm_command(` search arduino-${name}`)
};

//calls npm to list the global packages installed
exports.list = () => {
    // 'npm list -g --depth=0'
    return call_npm_command(`list -g --depth=0`)
};

exports.uninstall = (name) => {
    console.log(`${name}`);

    let arduino_folder = path.join(os.homedir(), "Documents", "Arduino", "libraries", name);

    if (!fs.existsSync(arduino_folder)) {
        throw `Symlink does not exist: ${arduino_folder}`;
    }
    fs.unlinkSync(arduino_folder);

    // 'npm uninstall -g <package-name>'
    return call_npm_command(`uninstall -g ${name}`)

};

exports.update = (library_name, cb) => {
    console.log(`update libraries`);
    console.log(`please wait..`);
    return call_npm_command(`update -g ${library_name}`)
};

function call_npm_command(string) {
    let output = execSync(`npm ${string}`);
    return output.toString();
}




//TODO fix broaken delete
exports.delete = (path_to_delete) => {
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