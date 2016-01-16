var React = require('react');
var $ = require ('jquery');

var History = React.createClass({
	getInitialState: function() {
		return {
			history: [],
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
				this.setState({history: data});
				return data;
			});
	},

	render: function() {
		var result,
			history = this.state.history,
			labels = history.map(r => r.date.substring(0, 9)),
			historicalData = history.map(r => r.breakdownImg/r.totalPageSize * 100);

		var data = {
			labels: labels,
			datasets: [
				{
					label: "Percentage of images on page",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: historicalData
				}
			]
		}

		if (document.getElementById("myChart")) {
			var ctx = document.getElementById("myChart").getContext("2d");
			var myLineChart = new Chart(ctx).Line(data, {});
		}

		if (this.state.url) {
			result = (
				<div className="result">
					<h4>Previous tests for {this.state.url}: </h4>
					<p>Diagram illustrates how did the the percentage of B coming from images used on this page change. </p>
				</div>);
		}

		return (
			<div>
				{result}
				<canvas id="myChart" width="1000" height="600"></canvas>
			</div>
		)
	}
})

module.exports = History;
