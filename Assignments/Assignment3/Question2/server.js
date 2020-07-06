const express  = require('express');
const fs = require('fs');
var app = express();
const request = require('request');

const url = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees';

//app.use(express.static(__dirname+'/public'));

app.set('views','./src/views');

app.set('view engine','ejs');

app.get('/', function(req,res){
    request(url,function(err,response,body){
        if(err)
        {
            console.log(err);
        }
        else
        {
            const output = JSON.parse(body);
            //res.send(output);
            res.render('main',{output,title:'Employee Details'});
        }
    })
})



app.listen(3000);
console.log("3000 is working now");
