console.log('included mongo');

var mongoose = require('mongoose');

var mongourl = 'mongodb://localhost:27017/otus';
var dbObj = {};

mongoose.connect(mongourl);
mongoose.model('neighborhoods', { id: String, name: String });

module.exports = mongoose;
