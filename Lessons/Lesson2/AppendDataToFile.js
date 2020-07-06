var fs = require('fs');

fs.appendFile('mytext.txt','Hi This is abhi here', function(err){
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("Data Appended SuccessFully");

    }
})