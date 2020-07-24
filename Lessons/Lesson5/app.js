const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
const app  = express();

const port = 3000;
const mongodburl = 'mongodb://localhost:27017/';
const collection_name = 'movies';
let db;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
var movies = require('./movies');
app.use('/movies',movies);

app.post('/movie',function(req,res){
    db.collection(collection_name)
    .insertOne(req.body,function(err,result){
        if(err) throw err;
        res.send('data inserted');
    })
});

app.get('/getMovies',function(req,res){
    db.collection(collection_name)
    .find().toArray(function(err,result){
        if(err) throw err;
        res.send(result);
    });
});

app.put('/updateMovie',function(req,res){
    db.collection(collection_name)
    .findOneAndUpdate({"name":req.body.name},{
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
    db.collection(collection_name)
    .findOneAndDelete({"name":req.body.name},
        function (err,result) {
            if(err)  res.send(500,err);
            res.send('success');
        })
});

app.get('/', function(req,res){
    res.send('API is working');
});

MongoClient.connect(mongodburl,{useNewUrlParser:true},function(err,client){
    if(err)
    {
        console.log(MongoClient.mongourl);
    console.log(err);
    console.log("Not able to connect");
    }
    else
    {
        db = client.db('moviesdb')
        app.listen(port,() =>{
        console.log("Able to connect");
        });
    }
});