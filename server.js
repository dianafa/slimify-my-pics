var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var UrlModel = require('./models/url.js');
var UrlRoute = require('./app/routes/url');
//var bodyParser = require('body-parser');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/url', UrlRoute.findAll);
app.get('/url/:id', UrlRoute.findById);

app.post('/new_url', function(req, res, next) {
	var url = new UrlModel({
		urlId: 7,
		address: 'www.lol.com',
		tests: 0
	});

	console.log(url);

	url.save(UrlModel,
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