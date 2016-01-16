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
					this.setState({breakdown: result.data.runs[1].firstView.breakdown});
					this.setState({totalPageSize: result.data.runs[1].firstView.bytesIn});
					document.getElementsByClassName('test-status-message')[0].style.color = 'green';
					console.log("breakdown", this.state.breakdown)

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
			result = null;

		if (this.state.breakdown) {
			let percentage = Math.round(this.state.breakdown.image.bytes / this.state.totalPageSize * 100 * 100) / 100,
				webp = Math.round(this.state.breakdown.image.bytes * 0.19 * 100) / 100,
				bpg = Math.round(this.state.breakdown.image.bytes * 0.83 * 100) / 100;

		var dataPie = [
		    {
				value: this.state.breakdown.image.bytes,
				color:"#F7464A",
				highlight: "#FF5A5E",
				label: "Image"
		    },
		    {
				value: this.state.breakdown.css.bytes,
				color: "#46BFBD",
				highlight: "#5AD3D1",
				label: "CSS"
		    },
			{
				value: this.state.breakdown.flash.bytes,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "Flash"
		    },
			{
				value: this.state.breakdown.font.bytes,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "Font"
			},
			{
				value: this.state.breakdown.html.bytes,
				color: "#FDB45C",
				highlight: "#FFC870",
				label: "HTML"
			},
			{
				value: this.state.breakdown.js.bytes,
				color: "#37caff",
				highlight: "#87dcff",
				label: "JS"
			},
			{
				value: this.state.breakdown.other.bytes,
				color: "#ffff37",
				highlight: "#ffff87",
				label: "other"
			}
		];

			result = (
				<div className="result">
					<p>Images on your page have <h3>{this.state.breakdown.image.bytes}B</h3>
					It is <strong>{percentage}%</strong> of your total page size!
					What about optimazing them?</p>
					<p>Using <strong>WEBP</strong> format your page would save up to {webp}B.</p>
					<p>Using <strong>BPG</strong> format your page would save up to {bpg}B.</p>
				</div>);

			var pieChart = document.getElementById("pieChart");
			if (pieChart) {
				pieChart.style.height = '300px';
				var ctxPie = pieChart.getContext("2d");
				var myDoughnutChart = new Chart(ctxPie).Doughnut(dataPie, {});
			}
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
					<canvas id="pieChart" width="300" height="300"></canvas>
					{result}
				</div>
			</div>
		)
	}
})

module.exports = UrlInput;
