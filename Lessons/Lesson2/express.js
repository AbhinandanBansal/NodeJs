const express = require ('express');
const fs = require('fs');
const app = express();
const port = 6500;

app.get('/', function(req,res){
    res.send('Welcome to Express Server')
})

app.get('/getMovies', function(req,res){
fs.readFile('data-db.json', function(err,data){
    if (err)
    {
        throw(err);
    }
    else
    {
        res.send(JSON.parse(data));
    }
})
})

app.listen(port,(err) => {
if (err) throw err;
console.log('server is running on\t' + port)
})