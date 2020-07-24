import express from 'express';
import redis from 'redis';
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8088;
let db;
const mongourl = 'mongodb://localhost:27017/';
const collection_name = 'countries';

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

const url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page='

app.get('/countrydata/:countryname',(req,res) => {
    
    var countryname = req.params.countryname;
    //console.log(countryname);
    client.get(countryname, (err,countrydetails )=> {
        //console.log(countrydetails);
        //console.log(err);
    if(countrydetails === null )
    {
    request(url + countryname , (err,response,body) =>{
        if(err){
            console.log(err);
        } else {
            //console.log(body);
            client.set(countryname, body)
            res.send(JSON.parse(body));
            //const output = JSON.parse(body);
           
        }
    });
    }
    else
    {
            //console.log(countrydetails);
            res.send(JSON.parse(countrydetails));
    }
    });
});


// default set zero
client.set('julvisit', 0);

// Default route
app.get('/',(req,res) => {
    client.get('julvisit', (err,julvisit )=> {
        res.send('Number of visit is ' + julvisit);
        client.set('julvisit', parseInt(julvisit)+1)
    }) 
})

/*MongoClient.connect(mongourl,function(err,client){
    if(err)
    {
    console.log(MongoClient.mongourl);
    console.log(err);
    console.log("Not able to connect");
    }
    else
    {
        db = client.db('countriesdb')
    }
});*/

app.listen(port,() => {
    console.log('app is running on port '+ port)
})