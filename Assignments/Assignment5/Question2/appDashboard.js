const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const bodyParser = require ('body-parser');
const port = 4800;
const app = express();
const mongourl = 'mongodb://127.0.0.1:27017/'
const col_name = 'orderlist';
let db;

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');
const sgMail = require('@sendgrid/mail');

const sgkey = '';

app.post('/sendEmail', (req,res)=>{
console.log(req.body);    
sgMail.setApiKey(sgkey);
const msg = {
  to: req.body.email,
  from: 'abhinandanb@talentica.com',
  subject: 'Order status',
  text: 'Your order status is ' + req.body.status,
  html: '<strong>Your order status is ' + req.body.status + ' </strong>',
};
console.log(msg)
sgMail.send(msg);
});

// Get Data from datbase and display on index
app.get('/', (req,res)=>{
    
    db.collection(col_name).find().toArray(function(err,result){
        var date1 = moment(moment().format('YYYY-MM-DD HH:mm:ss'),'YYYY-MM-DD HH:mm:ss');
        result.forEach(function(element){
        var duration = moment.duration(date1.diff(element.createdDate));
            if(duration.asDays().toFixed(2) < 1)
            {
                element.status = "In Progress"
            }
            if(duration.asDays().toFixed(2) >= 1 && duration.asDays().toFixed(2) < 2)
            {
                element.status = "Dispatched"
            }
            if(duration.asDays().toFixed(2) >= 2)
            {
                element.status = "Delivered"
            }
        })
        if(err) res.send(500,err);
        res.render('index.ejs',{data:result})
    })

})

MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('admin')
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })
})