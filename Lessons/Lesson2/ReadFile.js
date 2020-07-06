var fs = require('fs');

fs.readFile('mytext3.txt',function(err,data){
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log(data.toString());
    }
})