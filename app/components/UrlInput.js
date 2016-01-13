var React = require('react');
var config = require('../../config.js');
var $ = require ('jquery')


var Results = require('./Results.js');


var UrlInput = React.createClass({
	getInitialState: function() {
		return {
			message: "please run test",
			value: 'www.google.com',
			test_id: 0,
			breakdown: {
				image: {
					bytes: null
				}
			}
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
		var interval = setInterval(this.getPageBreakdown, 2000);
		this.setState({interval: interval});
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
				<h3>{this.state.message}</h3>
				<Results
					image_bytes = {this.state.breakdown.image.bytes}
				/>
			</div>
		)
	}
})

module.exports = UrlInput;
