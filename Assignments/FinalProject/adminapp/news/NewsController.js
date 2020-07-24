const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
var localStorage = new LocalStorage('./scratch');
const moment = require('moment');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const News = require('./News');
const User = require('../user/User.js');

router.get('/createnews', (req, res) => {
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            res.redirect('/')
        };
        var decoded = jwt.decode(token, { complete: true });
        res.render('addNews.ejs', {
            error: req.query.valid ? req.query.valid : '',
            msg: req.query.msg ? req.query.msg : '', data: { name: decoded.payload.name, email: decoded.payload.email }
        })
    });
});

router.get('/reset', (req, res) => {
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            res.redirect('/')
        };
        var decoded = jwt.decode(token, { complete: true });
        res.render('addNews.ejs', {
            error: req.query.valid ? req.query.valid : '',
            msg: req.query.msg ? req.query.msg : '', data: { name: decoded.payload.name, email: decoded.payload.email }
        })
    });
});

router.delete('/deletenews', function (req, res) {
    //console.log(req.body.id);
    News.findOneAndDelete({ "_id": req.body.id },
        function (err, result) {
            //console.log(err);
            if (err) {
                console.log(err.msg);
                res.send(500, err);
            }
            res.send(result);
            //res.render('newslist.ejs');
            //return req.body.id;
            //res.redirect('/news/newslist');
        })
});

router.post('/find_by_id', function (req, res) {
    //console.log(req.body.id);
    News.findOne({ "_id": req.body.id },
        function (err, result) {
            //console.log(err);
            if (err) {
                console.log(err.msg);
                res.send(500, err);
            }
            //res.render('newslist.ejs');
            //console.log(result)
            res.send(result);
            //res.redirect('/news/newslist');
        })
});

router.put('/updatenews', function (req, res) {
    console.log(req.body.id);
    News.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            publishedat: req.body.publishedat
        }
    },
        {
            upsert: true
        },
        function (err, result) {
            console.log(result)
            if (err) res.send(err);
            res.send(result);
        })
});

router.get('/getnewsbycategory/:category', function (req, res) {
    var category = req.params.category;
    News.find({ category: category }, function (err, result) {
        res.send(result);
    })
})

router.get('/getlatestnews', function (req, res) {
    var q = News.find({}).sort({ publisheddate: -1 }).limit(3);
    q.exec(function (err, result) {
        res.send(result);
    });
})

// Add News to database
router.post('/addNews', function (req, res) {
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            res.redirect('/')
        };
        var decoded = jwt.decode(token, { complete: true });
        if (decoded.payload.userType === 1) {
            News.create({
                title: req.body.title,
                description: req.body.description,
                url: req.body.url,
                imageurl: req.body.imageurl,
                publishedat: req.body.publishedat,
                category: req.body.category,
                publisheddate: moment(req.body.publishedat).format('DD-MM-YYYY')
            },
                function (err, user) {
                    if (err) return res.status(500).send("There was a problem while adding the news.")
                    //const message = encodeURIComponent('News added successfully.');
                    const message = 'News added successfully.';
                    res.render('addNews.ejs', { msg: message, error: '', data: { name: decoded.payload.name, email: decoded.payload.email } });
                });
        }
        else {
            const string = encodeURIComponent("! You don't have privilege to view newslist.");
            res.redirect('/?valid=' + string)
        }
    });

});

//Get newslist from database
router.get('/newslist', function (req, res) {
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            res.redirect('/')
        };
        var decoded = jwt.decode(token, { complete: true });
        if (decoded.payload.userType === 1) {
            News.find({}, function (err, news) {
                if (err) { res.redirect('/') }
                //if (!user) {res.redirect('/')}
                //console.log(news);
                res.render('newslist.ejs', { data: news })
            });

        }
        else {
            const string = encodeURIComponent("! You don't have privilege to view newslist.");
            res.redirect('/?valid=' + string)
        }
    });
});

module.exports = router;