var mongoose = require('mongoose');
const { Int32 } = require('mongodb');
var Schema = mongoose.Schema;

var movieModel = new Schema({
    name: {type:String},
    genre: {type:String},
    rating: {type:Number},
    language: {type:String},
    achievements: {type:String}
});

module.exports = mongoose.model('movie',movieModel,'movies');