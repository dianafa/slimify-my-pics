var UrlModel = require('../../models/url.js');

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
		var address = req.params.address,
			result = null;

		UrlModel.find({ address: address }, function (err, url) {
			if (err) {
				console.log(err);
				result = {
					message:'Whoooops, something went wrong :D'
				};
			} else {
				result = url;
			}
		})

		res.send(result)
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
				console.error(String(err));
				new_url.urlId++;
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