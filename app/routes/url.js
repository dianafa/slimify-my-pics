var UrlModel = require('../../models/url.js');
var TestModel = require('../../models/test.js');
var TestRoute = require('./test.js')

var UrlRoute = {
	findAll: function(req, res, next) {
		var name = req.query.name;
		UrlModel.find({}, function (err, urls) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(urls)
			}
		})
	},

	findById: function(req, res, next) {
		var id = req.params.id;
		UrlModel.find({ urlId: id }, function (err, url) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(url)
			}
		})
	},

	findByAddress: function(req, res, next) {
		var address = req.params.id,
			query  = UrlModel.where({ address: address }),
			result = {
				url: null,
				tests: null
			},
			id = null;

		query.findOne({ address: address }, function (err, url) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
				return;
			}

			//if url not found
			if (!url) {
				res.send({});
				return;
			}

			id = url.urlId;
			result.url = url;

			TestModel.find({ urlId: id }, function (err, t) {
				if (err) {
					res.send({
						message:'Whoooops, something went wrong :D'
					});
					return;
				}

				result.tests = t;
				res.send(result);
			})
		})
    },

    findByDomain: function(req, res, next) {
		var address = req.params.address;
		UrlModel.find({ address: new RegExp(address, 'i') }, function (err, url) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(url)
			}
		})
    },

	tryToSave: function(new_url, req, res) {
		new_url.save(function(err) {
			if (err) {
				new_url.urlId++;
				console.error(String(err));
				console.log("Creating URL record with new ID: ", new_url)
				UrlRoute.tryToSave(new_url, req, res);
			} else {
				res.send({
					message:'New URL has bees saved with urlId: ' + new_url.urlId
				});
            }
		});
	}
};

module.exports = UrlRoute;