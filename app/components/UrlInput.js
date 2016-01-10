var React = require('react');

var UrlInput = React.createClass({
	onClick: function() {
		console.log("click!");
	},

	render: function() {
		return (
			<div>
				<p>URL:</p>
				<input type="text" name="url" />
				<button className="url-submit-button" onClick={this.onClick}>
					Start
				</button>
			</div>
		)
	}
})

module.exports = UrlInput;