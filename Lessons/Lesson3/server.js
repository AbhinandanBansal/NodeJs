const express  = require('express');
var app = express();
app.set('view engine','ejs');
app.get('/', function(req,res){
    res.render('index',{user:"Great User",title:"home page"});
});
app.listen(8080);
console.log("8080 is working now");
