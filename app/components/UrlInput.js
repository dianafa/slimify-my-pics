var React = require('react');
var config = require('../../config.js');
var $ = require ('jquery')

var UrlInput = React.createClass({
	getInitialState: function() {
		return {
			value: 'www.google.com',
			test_id: 0
		};
	},

	handleChange: function(event) {
		this.setState({value: event.target.value});
	},

	onClick: function() {
		return $.getJSON('http://www.webpagetest.org/runtest.php?url=' + this.state.value + '&k=' + config.webtest_api_key + '&f=json')
		.then((data) => {
			this.setState({test_id: data.data.testId});
			console.log("test_id:", this.state.test_id);
			return data;
		});
	},

	render: function() {
		var value = this.state.value;
		return (
			<div>
				<p>URL:</p>
				<input type="text" name="url" value={value} onChange={this.handleChange} />
				<button className="url-submit-button" onClick={this.onClick}>
					Start
				</button>
			</div>
		)
	}
})

module.exports = UrlInput;
