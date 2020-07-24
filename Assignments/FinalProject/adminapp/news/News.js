const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  imageurl: String,
  publishedat: String,
  category: String,
  publisheddate: Date
});
mongoose.model('news', NewsSchema);

module.exports = mongoose.model('news');