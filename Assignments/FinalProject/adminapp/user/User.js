const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  userType: Number
});
mongoose.model('user', UserSchema);

module.exports = mongoose.model('user');