var fs = require('fs');

fs.readFile('Sample.txt', function(err,data){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(data.toString());
    }
})

console.log("Program End");