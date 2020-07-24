const express = require('express');
const mongoose = require('mongoose');
var mongourl = 'mongodb://localhost:27017/moviesdb';
var db = mongoose.connect(mongourl);
var movie = require('./models/moviemodel');
const bodyparser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

var commonRouter = express.Router();

commonRouter.route('/getMovieswithRouter')
.get(function (req,res) {
    movie.find(function(err,result){
        if(err) res.send(500,err);
        res.json(result);
    });
});

app.get('/getMovies',function (req,res) {
    movie.find(function(err,result){
        if(err) res.send(500,err);
        res.json(result);
    })
})

app.post('/createMovie',function (req,res) {
    movie.create(req.body,function(err,result){
        if(err) res.send(500,err);
        res.json(result);
    })
})

app.put('/updateMovie',function(req,res){
    movie.findOneAndUpdate({name:req.body.name},{
        $set:{
            name: req.body.name,
            rating: req.body.rating,
            achievements: req.body.achievements
        }},
        {
            upsert:true
        },
        function (err,result) {
            if(err)  res.send(err);
            res.send(result);
        })
});

app.delete('/deleteMovie',function(req,res){
    movie.findOneAndDelete({"name":req.body.name},
        function (err,result) {
            if(err)  res.send(500,err);
            res.send('success');
        })
});

app.get('/', function(req,res){
    res.send('API is working');
});

app.listen(port,() =>{
    console.log("Able to connect");
    });