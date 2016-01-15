var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var UrlModel = require('./models/url.js');
var TestModel = require('./models/test.js');
var UrlRoute = require('./app/routes/url');
var bodyParser = require('body-parser');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/url/addr/:address', UrlRoute.findByAddress);
app.get('/url/:id', UrlRoute.findById);
app.get('/url', UrlRoute.findAll);

app.post('/url', function(req, res, next) {
	console.log("req", req.body);
	var address = req.body.address,
		id = req.body.id,
		new_url = new UrlModel({
			urlId: id,
			address: address,
			testedBefore: true
		});

	console.log(new_url);

	UrlRoute.tryToSave(new_url, req, res);
})


app.post('/tests', function(req, res, next) {
	var gender = req.body.gender;
	var characterName = req.body.name;
	var new_url = new UrlModel({
		urlId: 7,
		address: 'www.lol.com',
		tests: 0
	});

	console.log(new_url);

	new_url.save(UrlModel,
		function(err,resp) {
			if(err) {
				console.log(err);
				res.send({
					message :'something went wrong'
				});
			} else {
				res.send({
					message:'the appointment has bees saved'
				});
			}
	});
})

app.get('/', function (req, res) {
  res.send('Hello Diana!');
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address,
		port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});