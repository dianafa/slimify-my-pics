var React = require('react');
var config = require('../../config.js');
var $ = require ('jquery');

var Results = require('./Results.js');


var UrlInput = React.createClass({
	getInitialState: function() {
		return {
			message: "Please run test",
			value: 'www.wp.pl',
			test_id: 0
		};
	},

	handleChange: function(event) {
		this.setState({value: event.target.value});
	},

	onClick: function() {
		this.setState({breakdown: null});
		this.setState({totalPageSize: null});

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
					this.setState(
						{breakdown: result.data.runs[1].firstView.breakdown}
					);
					this.setState({fullResults: result.data.runs[1].firstView});
					document.getElementsByClassName('test-status-message')[0].style.color = 'green';

					//save to DB
					this.props.addToHistory(result);
				}
				return result;
			});
	},

	checkForResults: function() {
		var interval = setInterval(this.getPageBreakdown, 5000);
		this.setState({interval: interval});
	},

	render: function() {
		var value = this.state.value,
			results = null;

		if (this.state.fullResults && this.state.breakdown) {
			results = (<Results breakdown={this.state.breakdown} fullResults={this.state.fullResults} />);
		}

		return (
			<div>
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
				</div>
				{results}
			</div>
		)
	}
})

module.exports = UrlInput;
