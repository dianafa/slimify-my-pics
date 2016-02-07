var React = require('react');

var Results = React.createClass({
	getInitialState: function() {
		return {
			image_bytes: null
		};
	},

	componentDidMount: function() {
		this.createPieChart();
	},

	createPieChart: function() {
		let pieChart = document.getElementById("pieChart");
		const breakdown = this.props.breakdown,
			pieData = [
				{
					value: breakdown.image.bytes,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Image"
				},
				{
					value: breakdown.css.bytes,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "CSS"
				},
				{
					value: breakdown.flash.bytes,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Flash"
				},
				{
					value: breakdown.font.bytes,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Font"
				},
				{
					value: breakdown.html.bytes,
					color: "#d1ff5a",
					highlight: "#e6ffaa",
					label: "HTML"
				},
				{
					value: breakdown.js.bytes,
					color: "#37caff",
					highlight: "#87dcff",
					label: "JS"
				},
				{
					value: breakdown.other.bytes,
					color: "#ffff37",
					highlight: "#ffff87",
					label: "other"
				}
			];

		if (pieChart) {
			const ctxPie = pieChart.getContext("2d");

			pieChart.style.height = '300px';
			return new Chart(ctxPie).Doughnut(pieData, {});
		}
	},

	render: function() {
		let imageBytes = this.props.breakdown.image.bytes,
			percentage = Math.round(imageBytes / this.props.fullResults.bytesIn * 100 * 100) / 100,
			webp = Math.round(imageBytes * 0.19),
			bpg = Math.round(imageBytes * 0.83);

		return (
			<div>
				<canvas id="pieChart" width="300" height="300"></canvas>
				<div className="result">
					Images on your page have <h3>{imageBytes} B</h3>
					It is <strong>{percentage}%</strong> of your total page size!
					What about optimazing them?
					<p>Using <strong>WEBP</strong> format your page would save up to {webp} B ({webp/1024} KB).</p>
					<p>Using <strong>BPG</strong> format your page would save up to {bpg} B ({bpg/1024} KB).</p>
				</div>
			</div>
		)
	}
})

module.exports = Results;
