var TestModel = require('../../models/test.js');

var TestRoute = {
	findAll: function(req, res, next) {
		var name = req.query.name;
		TestModel.find({}, function (err, tests) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(tests)
			}
		})
	},

	findById: function(req, res, next) {
		var id = req.params.id;
		TestModel.find({ testId: id }, function (err, test) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(test)
			}
		})
	},

	findByUrl: function(req, res, next) {
		var url = req.params.url;
		TestModel.find({ urlId: urlId }, function (err, test) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(test)
			}
		})
	},

    findByAddress: function(req, res, next) {
		var address = req.params.address;


		TestModel.find({ address: new RegExp(address, 'i') }, function (err, test) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(test)
			}
		})
	},

	tryToSave: function(new_test, req, res) {
		new_test.save(function(err) {
			if (err) {
				console.error(String(err));
				new_test.testId++;
				console.log("Creating test record with new ID: ", new_test)
				TestRoute.tryToSave(new_test, req, res);
			} else {
				res.send({
					message:'New test has bees saved with testId: ' + new_test.testId
				});
            }
		});
	},

	findAllWithUrl: function(url) {
		TestModel.find({ address: new RegExp(address, 'i') }, function (err, test) {
			if (err) {
				console.log(err);
				res.send({
					message:'Whoooops, something went wrong :D'
				});
			} else {
				res.send(test)
			}
		})
	}
};

module.exports = TestRoute;