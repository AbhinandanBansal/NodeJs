const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Product = require('./Product');


router.get('/addProduct',  (req, res) => {
    res.render('addProduct.ejs',{error: req.query.valid?req.query.valid:'',
    msg: req.query.msg?req.query.msg:''})
 });

 // Add Product to the database
router.post('/addItem', function (req, res) {
        var token = localStorage.getItem('authtoken')
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.redirect('/')
        };
        var decoded = jwt.decode(token, {complete: true});
        if(decoded.payload.userType === 1)
        {    
            Product.create({
                name : req.body.name,
                info: req.body.info,
                quantity : req.body.quantity,
                price : req.body.price
              }, function (err, product) {
                if (err) return res.status(500).send("There was a problem adding the product.")
                const string = encodeURIComponent('product added');
                res.redirect('/products/addProduct?msg=' + string);
              }); 
        }
        else
        {
            const string = encodeURIComponent("! You don't have privilege to add product.");
            res.redirect('/?valid=' + string)
        }
    });
});

// GETS A LIST OF PRODUCTS FROM THE DATABASE
router.get('/shoppingList', function (req, res) {
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
    
        Product.find({}, function (err, products) {
            if (err) {res.redirect('/')}
            //if (!user) {res.redirect('/')}
            res.render('shoppingList.ejs',{data:products})
        });

    });
});

module.exports = router;