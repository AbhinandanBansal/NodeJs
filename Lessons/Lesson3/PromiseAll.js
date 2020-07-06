const fs = require('fs');
const util = require('util');

var read = util.promisify(fs.readFile);

Promise.all(
    [
        read('data1.txt'),
        read('data2.txt'),
        read('data3.txt')
    ]
).then(data=>{
    const[data1,data2,data3] = data;
    console.log(data1.toString());
    console.log(data2.toString());
    console.log(data3.toString());
})