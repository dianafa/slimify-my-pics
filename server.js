var express = require('express'),
	history = require('./app/routes/history'),
	app = express();

app.use(express.static('app'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/history', history.findAll);
app.get('/history/:id', history.findById);


// app.get('/', function (req, res) {
//   res.send('Hello Diana!');
// });

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(server.address())

  console.log('Example app listening at http://%s:%s', host, port);
});