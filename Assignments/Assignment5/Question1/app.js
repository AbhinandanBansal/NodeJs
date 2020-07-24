import express from 'express';
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
import bodyParser from 'body-parser';
const port = 8900;
const app = express();
const mongourl = 'mongodb://127.0.0.1:27017/'
const col_name = 'orderlist';
var db = mongoose.connect(mongourl);
var order = require('./models/ordermodel');
//var orderReport = require('./models/ordermodel').orderReport;

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from datbase and display on index
app.get('/', (req,res)=>{
    order.find(function(err,result){
        if(err) res.send(500,err);
        res.render('index.ejs',{data:result})
    })

})

// Post data from ui
app.post('/addData', (req,res) => {
   // req.body.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    order.create(req.body,function(err,result){
        if(err) res.send(500,err);
        res.redirect('/addOrder');
    })

})


// Update User
/*app.put('/update_user',(req,res)=>{
    db.collection(col_name)
        .findOneAndUpdate({"name":req.body.name},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})*/

// Opening Add Order page
app.get('/addOrder',(req,res) => {
    res.render('order')
})

/*MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('orderdb')
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })
})*/

app.listen(port,() =>{
    console.log("Able to connect");
    });