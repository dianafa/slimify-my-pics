var React = require('react');
var $ = require ('jquery');

var History = React.createClass({
	getInitialState: function() {
		return {
			previous_tests: [],
			url: null
		};
	},

	showHistory: function(url) {
		var tests = this.getHistory(url);
		this.setState({url: url});
	},

	getHistory: function(url) {
		return $.getJSON('http://localhost:3000/test/' + url)
			.then((data) => {
				console.log("data", data)
				return data;
			});
	},

	render: function() {
		var result;

		if (this.state.url) {
			result = (
				<div className="result">
					<h3>Previous tests for: {this.state.url} </h3>
				</div>);
		}

		return (
			<div>
				{result}
			</div>
		)
	}
})

module.exports = History;
