var React = require('react');
var config = require('../../config.js');
var $ = require ('jquery');

var Results = require('./Results.js');


var UrlInput = React.createClass({
	getInitialState: function() {
		return {
			message: "Please run test",
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
		this.props.showHistory(this.state.value);
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
			.then((result) => {
				this.setState({message: result.statusText});
				console.log(result);
				if (result.statusCode == 200) {
					clearInterval(this.state.interval);
					this.setState({breakdown: result.data.runs[1].firstView.breakdown});
					this.setState({totalPageSize: result.data.runs[1].firstView.bytesIn});
					console.log("breakdown", this.state.breakdown)

					//save to DB
					this.props.addToHistory(result);
				}
				return result;
			});
	},

	checkForResults: function() {
		var interval = setInterval(this.getPageBreakdown, 1000);
		this.setState({interval: interval});
	},

	render: function() {
		var value = this.state.value,
			result = null;

		if (this.state.breakdown) {
			let percentage = Math.round(this.state.breakdown.image.bytes / this.state.totalPageSize * 100 * 100) / 100,
				webp = Math.round(this.state.breakdown.image.bytes * 0.19 * 100) / 100,
				bpg = Math.round(this.state.breakdown.image.bytes * 0.83 * 100) / 100;

			result = (
				<div className="result">
					<p>Images on your page have <h3>{this.state.breakdown.image.bytes}B</h3>
					It is <strong>{percentage}%</strong> of your total page size!
					What about optimazing them?</p>
					<p>Using <strong>WEBP</strong> format your page would save up to {webp}B.</p>
					<p>Using <strong>BPG</strong> format your page would save up to {bpg}B.</p>
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
				<div className="medium-12 columns test-status-message">{this.state.message}</div>
				{result}
			</div>
		)
	}
})

module.exports = UrlInput;
