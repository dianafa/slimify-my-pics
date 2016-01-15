var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');

//models
var UrlModel = require('./models/url.js');
var TestModel = require('./models/test.js');

//routes
var UrlRoute = require('./app/routes/url');
var TestRoute = require('./app/routes/test');

//DB
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

//app
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

//routes

/*
 * URL ROUTE
 */
app.get('/url/domain/:address', UrlRoute.findByDomain);
app.get('/url/:id', function(req, res, next) {
	if (typeof req.params.id === 'number') {
		return UrlRoute.findById(req, res, next);
	}

	return UrlRoute.findByAddress(req, res, next);
});

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

	UrlRoute.tryToSave(new_url, req, res);
})

/*
 * TEST ROUTE
 */
app.get('/test/url/:urlId', TestRoute.findByUrl);
app.get('/test/:id', TestRoute.findById);
app.get('/test', TestRoute.findAll);

app.post('/test', function(req, res, next) {
	console.log("req", req.body);
	var new_test = new TestModel({
			testId: req.body.id,
			urlId: req.body.urlId,
			breakdownImg: req.body.breakdownImg,
			totalPageSize: req.body.totalPageSize
		});

	console.log(new_test);
	TestRoute.tryToSave(new_test, req, res);
})

app.get('/', function (req, res) {
  res.send('Hello Diana!');
});

var server = app.listen(app.get('port'), function() {
	var host = server.address().address,
		port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});