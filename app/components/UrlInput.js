var React = require('react');
var config = require('../../config.js');
var $ = require ('jquery')


var Results = require('./Results.js');


var UrlInput = React.createClass({
	getInitialState: function() {
		return {
			message: "please run test",
			value: 'www.google.com',
			test_id: 0
		};
	},

	handleChange: function(event) {
		this.setState({value: event.target.value});
	},

	onClick: function() {
		this.getTestId().then(()=> {
			this.checkForResults();
		})
	},

	getTestId: function() {
		return $.getJSON('http://www.webpagetest.org/runtest.php?url=' + this.state.value + '&k=' + config.webtest_api_key + '&f=json')
			.then((data) => {
				this.setState({test_id: data.data.testId});
				console.log("test_id:", this.state.test_id);
				return data;
			});
	},

	getPageBreakdown: function() {
		return $.getJSON('http://www.webpagetest.org/jsonResult.php?test=' + this.state.test_id + '&breakdown=1&noimages=1')
			.then((response) => {
				this.setState({message: response.statusText});
				console.log(response);
				if (response.statusCode == 200) {
					clearInterval(this.state.interval);
					this.setState({breakdown: response.data.runs[1].firstView.breakdown});
					console.log("breakdown", this.state.breakdown)
				}
				return response;
			});
	},

	checkForResults: function() {
		var interval = setInterval(this.getPageBreakdown, 4000);
		this.setState({interval: interval});
	},

	render: function() {
		var value = this.state.value,
			result = null;

		if (this.state.breakdown) {
			result = (
				<div className="result">
					Images on your page have {this.state.breakdown.image.bytes}B.
					What about optimazing them?
				</div>);
		}
		return (
			<div className="row url-input">
				<div className="medium-3 columns">
					<label className="text-right middle">URL</label>
				</div>
				<div className="medium-5 columns">
					<input type="text" name="url" value={value} onChange={this.handleChange} />
				</div>
				<button type="button" className="success button" onClick={this.onClick}>
					Start
				</button>
				<div className="test-status-message">{this.state.message}</div>
				{result}
			</div>
		)
	}
})

module.exports = UrlInput;
