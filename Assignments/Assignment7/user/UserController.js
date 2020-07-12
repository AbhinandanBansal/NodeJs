const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('./User');



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});



// GETS A SINGLE USER FROM THE DATABASE
    router.get('/profile', function (req, res) {
        var token = localStorage.getItem('authtoken')
        console.log("token>>>",token)
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.redirect('/')
        };
            User.findById(decoded.id, { password: 0 }, function (err, user) {
                if (err) {res.redirect('/')}
                if (!user) {res.redirect('/')}
                res.render('profile.ejs',{user})
            });
        });
    });

// GETS A SINGLE USER FROM THE DATABASE
router.get('/adminProfile', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            res.render('adminProfile.ejs',{user})
        });
    });
});


// GETS A LIST OF USERS FROM THE DATABASE
router.get('/userslist', function (req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>",token)
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
        var decoded = jwt.decode(token, {complete: true});
        console.log(decoded.payload);
        if(decoded.payload.userType === 1)
        {    
        User.find({}, function (err, users) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            res.render('userList.ejs',{users})
        });
        console.log("User List")
        }
        else
        {
            const string = encodeURIComponent("! You don't have privilege to view userslist.");
            res.redirect('/?valid=' + string)
        }
    });
});


router.get('/signup',  (req, res) => {
    res.render('signup.ejs')
 });

 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;