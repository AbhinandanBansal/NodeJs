var fs = require('fs');

const data = fs.readFileSync('Sample.txt');

console.log(data.toString());

console.log("Program End");