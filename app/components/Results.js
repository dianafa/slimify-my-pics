var React = require('react');

var Results = React.createClass({
	getInitialState: function() {
		return {
			image_bytes: null
		};
	},

	render: function() {
		return (
			<div>
				<h3>Images on your page take {this.state.image_bytes} bytes</h3>
			</div>
		)
	}
})

module.exports = Results;
