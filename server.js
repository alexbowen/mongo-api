var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

app.get('/api/:type', function(req, res){

	MongoClient.connect('mongodb://127.0.0.1:27017/ttgd', function(err, db) {
		
	    if(err) throw err;

	    var collection = db.collection('ttgd');

	    // Locate all the entries using find
	    collection.find({type:req.param('type')}).toArray(function(err, results) {

	    	res.header('Access-Control-Allow-Origin', "*");
	        res.send(results);

	        db.close();
	    });
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});