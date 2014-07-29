var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var http = require('http');
var https = require('https');
var fs = require('fs');

var port = 8001;

var options = {
    key: fs.readFileSync('./myrsakey.pem'),
    cert: fs.readFileSync('./myrsacert.pem'),
};

var app2 = express();

var sserver = https.createServer(options, app2).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.get('/blog', function(req, res){

	console.log('/blogger/v3/blogs/888871340674436854/posts?key=AIzaSyBGIwF36zQGgvyDkA1kh6B5H8JqIcAEUE4&labels=' + req.param('label'));

	var options = {
	  host: 'www.googleapis.com',
	  //port: '80',
	  path: '/blogger/v3/blogs/888871340674436854/posts?key=AIzaSyBGIwF36zQGgvyDkA1kh6B5H8JqIcAEUE4&labels=' + req.param('label'),
	  method: 'GET'
	};

//user 888871340674436854

	callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, respond to original request here
	  response.on('end', function () {
	    res.header('Access-Control-Allow-Origin', "*");
	    res.send(str);
	  });
	}

	https.request(options, callback).end();
	
});

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