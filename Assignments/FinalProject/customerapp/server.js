import express, { response } from 'express';
const MongoClient = require('mongodb').MongoClient;
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
var errorHandler = require('errorhandler');
const port = 8900;
const app = express();
let db;
const mongourl = 'mongodb://127.0.0.1:27017/newsdb'
const col_name = 'news';
const mongoose = require('mongoose');
mongoose.connect(mongourl);
const iplocate = require("node-iplocate");
const publicIp = require('public-ip');
const sgMail = require('@sendgrid/mail')
const axios = require('axios').default;
let io = require('socket.io');

const adminurl = "http://localhost:3000";

const whetherAPIKey = ''; //Add open weather  API key

const sendgridAPIKey = ''; //Add Send Grid API key

const googleMapAPIKey = ''; //Add GoogleMap API Key

const weatherAPIURL = 'https://api.openweathermap.org/data/2.5/onecall?appid=' + whetherAPIKey;

const googleMapKeyURL = "https://maps.googleapis.com/maps/api/geocode/json?key=" + googleMapAPIKey;



sgMail.setApiKey(sendgridAPIKey)

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/home', (req, res) => {
    axios.get(adminurl + '/news/getlatestnews').then(response => {
        res.render('home.ejs', { data: response.data });
    })
        .catch(err => {
            return res.json(err);
        });
});

app.get('/sports', (req, res) => {
    axios.get(adminurl + '/news/getnewsbycategory/sports').then(response => {
        res.render('sports.ejs', { data: response.data });
    })
        .catch(err => {
            return res.json(err);
        });

});

app.get('/contactus', (req, res) => {
    res.render('contactus.ejs')
});

app.post('/getweatherinfo', (req, res) => {
    var weatherparams = '&lat=' + req.body.lat + '&lon=' + req.body.lon;
    var locationparams = '&latlng=' + req.body.lat + ',' + req.body.lon;
    var weatherResponse;
    axios.get(weatherAPIURL + weatherparams)
        .then(response => {
            weatherResponse = response.data.current;
            const locationurl = googleMapKeyURL + locationparams;
            axios.get(locationurl)
                .then(locres => {
                    res.send({ data: { "weatherinfo": weatherResponse, "city": locres.data.results[0].address_components[4].long_name } });
                })
                .catch(err => {
                    return res.json(err);
                });
        })
        .catch(err => {
            return res.json(err);
        });
});

app.get('/aboutus', (req, res) => {
    let city;
    publicIp.v4().then(ip => {
        console.log(ip);
        iplocate(ip).then(function (results) {
            console.log(results.city)
            city = results.city;
            if (!results.city) {
                city = "pune";
            }
        });
    });
    res.render('aboutus.ejs', { data: { city: city } })
});

app.post('/sendemail', (req, res) => {
    console.log(req.body);
    sgMail.send({
        to: 'query@update24.com',
        from: req.body.email,
        subject: 'Query',
        text: req.body.query
    })
    res.redirect('/contactus');
})


// Opening livechat page
app.get('/livechat', (req, res) => {
    res.render('livechat.ejs')
})

/*MongoClient.connect(mongourl, (err, client) => {
    if (err) throw err;
    db = client.db('newsdb')
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})*/

app.set('port', port);

if (app.get('env') === 'development') {
    app.use(errorHandler())
}

// Set up express
let server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {

    var list = io.sockets.sockets;
    var users = Object.keys(list);



    // Set the nickname property for a given client
    socket.on('nick', (nick) => {
        socket.nickname = nick;
        socket.emit('userlist', users);
    });



    // Relay chat data to all clients
    socket.on('chat', (data) => {

        let nick = socket.nickname;

        if (!nick) {
            nick = 'Anonymous';
        }
        let nickname = nick;

        let payload = {
            message: data.message,
            nick: nickname
        };

        socket.emit('chat', payload);
        socket.broadcast.emit('chat', payload);
    });
});