const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  userType: Number
});
mongoose.model('ECommUser', UserSchema);

module.exports = mongoose.model('ECommUser');