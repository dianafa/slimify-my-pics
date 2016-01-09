var React = require('react');

var ReactDOM = require('react-dom');

var UrlInput = React.createClass({
	render: function() {
		return (
			<div>
				<input type="text" name="url" />
			</div>
		)
	}
})

ReactDOM.render(
	<UrlInput />,
	document.getElementById('input')
)