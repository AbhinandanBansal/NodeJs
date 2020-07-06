var fs = require('fs');
fs.rename('mynote.txt','mytext.txt',function(err){
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("File renamed successfully");
    }
})