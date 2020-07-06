var fs = require('fs');

fs.writeFile('mynewtext.txt',"This is a write file function",function(err){
    if(err)
    {
        return console.error(err);
    }
    else
    {
        console.log("Data written successfully.")
    }
})