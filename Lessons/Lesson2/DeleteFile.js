var fs = require('fs');

fs.unlink('mynewtext.txt',function(err){
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("File got deleted");
    }
})