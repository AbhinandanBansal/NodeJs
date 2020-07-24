import express from 'express';
const MongoClient = require('mongodb').MongoClient;
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
let db;
const mongourl = 'mongodb://127.0.0.1:27017/newsdb'
const col_name = 'news';
const mongoose = require('mongoose');
mongoose.connect(mongourl);

const UserController = require('./user/UserController');
app.use('/users', UserController);

const NewsController = require('./news/NewsController');
app.use('/news', NewsController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from datbase and display on index
app.get('/', (req, res) => {
    res.render('register.ejs', {
        error: req.query.valid ? req.query.valid : '',
        msg: req.query.msg ? req.query.msg : ''
    })
})

// Post data from ui
app.post('/addData', (req, res) => {
    db.collection(col_name)
        // In Req.body we will recive the data
        // from form.
        .insert(req.body, (err, result) => {
            if (err) throw err;
            console.log('data.inserted');
        })
    res.redirect('/');
})

// Delete Selected News
app.delete('/delete_news', (req, res) => {
    db.collection(col_name).findOneAndDelete({
        "name": req.body.name
    }, (err, result) => {
        if (err) return res.send(500, err)
        res.send({ message: 'success' })
    })
})

// Find news by name
app.post('/find_by_name', (req, res) => {
    let name = req.body.name;
    db.collection(col_name)
        .find({ name: name })
        .toArray((err, result) => {
            if (err) throw err;
            res.send(result)
        })
});



// Opening Add News page
app.get('/addNews', (req, res) => {
    res.render('addNews.ejs')
})

MongoClient.connect(mongourl, (err, client) => {
    if (err) throw err;
    db = client.db('newsdb')
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})