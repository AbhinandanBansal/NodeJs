var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var orderModel = new Schema({
    name: {type:String},
    email: {type:String},
    address: {type:String},
    createdDate: {type:String, default: moment().format('YYYY-MM-DD HH:mm:ss')},
    orderDetails: {type:String}
});

/*var orderModel = new Schema({
    name: {type:String},
    email: {type:String},
    address: {type:String},
    createdDate: {type:String, default: moment().format('YYYY-MM-DD HH:mm:ss')},
    orderDetails: {type:String},
    status: {type:String, default: function(){
        var date1 = moment(moment().format('YYYY-MM-DD HH:mm:ss'),'YYYY-MM-DD HH:mm:ss');
        var duration = moment.duration(date1.diff(this.createdDate)).asDays.toFixed(2);
        if(duration <=1)
        {
            return "In Progress";
        }
        if(duration >1 && duration <=2)
        {
            return "Dispatched";
        }
        if(duration >2)
        {
            return "Delivered";
        }
    }}
});*/

module.exports = mongoose.model('order',orderModel,'orderlist');
//module.exports = mongoose.model('orderReport',orderModelReport,'orderlist');