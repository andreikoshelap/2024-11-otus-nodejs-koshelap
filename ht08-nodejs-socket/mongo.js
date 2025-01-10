console.log('included mongo');

var MongoClient = require('mongodb').MongoClient;

var mongourl = 'mongodb://localhost/otus';
var dbObj = {};

MongoClient.connect(mongourl, function(err, db){
  if(err) {
    dbObj.err = err;
    console.log('error', err);
  }
  else {
    dbObj.db = db;
    db.collection('neighborhoods', function(err, coll){
      dbObj.neighborhoods = coll;
    });
  }
});



module.exports = dbObj;
