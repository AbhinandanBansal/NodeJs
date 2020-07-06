const path = require('path');
var p = 'E:\Learning\NodeJS\Assignment1\app.txt';

console.log(path.dirname(p));              //dir path
console.log(path.basename(p));             //last part of the path 

console.log(path.extname(p));              //extn of the file
console.log(path.isAbsolute(p));           //is the path valid