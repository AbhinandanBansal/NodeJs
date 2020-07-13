const mongoose = require('mongoose');  
const ProductSchema = new mongoose.Schema({  
  name: String,
  info: String,
  quantity: Number,
  price: Number
});
mongoose.model('ECommProduct', ProductSchema);

module.exports = mongoose.model('ECommProduct');