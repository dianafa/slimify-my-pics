var React = require('react');

var Results = React.createClass({
	getInitialState: function() {
		return {
			image_bytes: null
		};
	},

	render: function() {
		let result = null,
			breakdown = this.props.breakdown,
			percentage = Math.round(breakdown.image.bytes / this.props.fullResults.bytesIn * 100 * 100) / 100,
			webp = Math.round(breakdown.image.bytes * 0.19),
			bpg = Math.round(breakdown.image.bytes * 0.83),
			pieChart = document.getElementById("pieChart"),
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
			pieChart.style.height = '300px';
			var ctxPie = pieChart.getContext("2d");
			var myDoughnutChart = new Chart(ctxPie).Doughnut(pieData, {});
		}

		result = (
			<div className="result">
				<div>Images on your page have <h3>{breakdown.image.bytes} B</h3>
				It is <strong>{percentage}%</strong> of your total page size!
				What about optimazing them?</div>
				<p>Using <strong>WEBP</strong> format your page would save up to {webp} B ({webp/1024} KB).</p>
				<p>Using <strong>BPG</strong> format your page would save up to {bpg} B ({bpg/1024} KB).</p>
			</div>);

		return (
			<div>
				<canvas id="pieChart" width="300" height="300"></canvas>
				{result}
			</div>
		)
	}
})

module.exports = Results;
