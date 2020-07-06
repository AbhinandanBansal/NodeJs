
const fs = require('fs');

const series = {
    title: 'Harry Potter',
    author: 'J. K. Rowling '
}

const seriesJSON = JSON.stringify(series);

fs.writeFile('JSONData.json',seriesJSON,function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Data written successfully");
    }
})

fs.readFile('JSONData.json',function(err,data){
    if(err)
    {
        console.log(err);
    }
    else
    {
        const parsedData = JSON.parse(data);
        console.log(parsedData.title);
    }
})