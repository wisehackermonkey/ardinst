/*
 upload arduino package to npm
 from the currect local directory
 by Oran C
 oranbusiness@gmail.com
 github.com/wisehackermonkey
 20190318
*/

const program = require("commander");
const create = require("./create");
const gitclone = require('gitclone');

program.parse(process.argv);

let list = program.args;

if (list.length) {
    // console.log("publish does not take argument's");
    if (list[0] === "clone") {
        console.log(`Clone repo`);
        gitclone("iondbproject/iondb", true);
    }
    console.log(`\n\ndid you mean 'ardinst publish clone <REPO_URL>'?\n\n`);

} else {

    console.log();

    console.log(`listing`);
    console.log(`Please wait..`);
    console.log(create.publish());
    console.log(`list complete`);

    console.log();

}
//V1  from scratch
//git init
//npm login
//npm init
//[ git global config user.name = "x"]
//[ git global config user.email = "y"]
//git add .
//git commit -m " first commit by ardinst"
//npm version minor
//npm publish


//v1 pull from repo and pub to npm

//git clone | wget https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/arduino-dblib/DB.zip
// [unzip REPO_NAME]
//cd REPO_NAME
//touch ......
// "test" > ...
//npm init
//     add repo url
//git add .
//git commit -m " first commit by ardinst"
//npm publish
//echo "npmjs.com/<PACKAGE_NAME>

/*
V2
npm login
git clone RUPOURL
cd REPO_NAME
npm init
    name: "arduino-<REPO_NAME>
    keywords ardinst arduino
    add '"preferGlobal": true' to package.json
touch README.md library.properites keywords.txt
echo "# <REPO_NAME> " >> README.md
git add .
git commit -m "auto first commit by npmjs.com/ardinst"
npm publish
*/

/*
good example for resource for library uploaders
http://playground.arduino.cc/Code/Library
*/


/*
example keywords.txt
https://playground.arduino.cc/code/library#Keywords
 LREK

LED13	KEYWORD1
on	KEYWORD2
off	KEYWORD2
blink	KEYWORD2
*/


/*
example libraries.property
https://github.com/arduino/Arduino/wiki/Arduino-IDE-1.5:-Library-specification

name=WebServer
version=1.0.0
author=Cristian Maglie <c.maglie@example.com>, Pippo Pluto <pippo@example.com>
maintainer=Cristian Maglie <c.maglie@example.com>
sentence=A library that makes coding a Webserver a breeze.
paragraph=Supports HTTP1.1 and you can do GET and POST.
category=Communication
url=http://example.com/
architectures=avr
includes=WebServer.h
*/
