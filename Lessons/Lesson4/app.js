const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3300;
const mongourl = 'mongodb://localhost:27017/';
const collection_name = 'movies';

//MongoClient.mongourl = mongourl;
MongoClient.connect(mongourl,function(err,client){
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