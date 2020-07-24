import express from 'express';
const MongoClient = require('mongodb').MongoClient;
import bodyParser from 'body-parser';
import moment from 'moment';
const port = 3000;
const app = express();
let db;
const mongourl = 'mongodb://127.0.0.1:27017/'
const col_name = 'buglist';

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from datbase and display on index
app.get('/', (req,res)=>{
    db.collection(col_name).find().toArray((err,result) => {
        //console.log(result);
        //console.log(result.length);
        var date1 = moment(moment().format('YYYY-MM-DD HH:mm:ss'),'YYYY-MM-DD HH:mm:ss');
        //console.log(date1);
        result.forEach(function(element){
            var duration = moment.duration(date1.diff(element.createdDate));
            element.leftOverDays = 3 - duration.asDays().toFixed(2);
        })
        console.log(result);
        if(err) throw err;
        res.render('index.ejs',{data:result})
    })
})

// Post data from ui
app.post('/addData', (req,res) => {
    req.body.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    db.collection(col_name)
        // In Req.body we will recive the data
        // from form.
        .insert(req.body, (err,result) => {
            if(err) throw err;
            console.log('data.inserted');
        })
    res.redirect('/');
})

// Delete Selected Bug
app.delete('/delete_bug',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "title":req.body.title
    },(err,result) => {
        if (err) return res.send(500,err)
        res.send({message: 'success'})
    })
})

// Find bug by title
app.post('/find_by_title',(req,res) => {
    let title = req.body.title;
    db.collection(col_name)
      .find({title:title})
      .toArray((err,result) => {
          if(err) throw err;
          res.send(result)
      })
});

// Update bug
app.put('/update_bug',(req,res)=>{
    db.collection(col_name)
        .findOneAndUpdate({"title":req.body.title},{
            $set:{
                title:req.body.title,
                description:req.body.description,
                assignee:req.body.assignee
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})

// Opening Add Bug page
app.get('/addBug',(req,res) => {
    res.render('admin')
})

MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('bugsdb')
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })
})