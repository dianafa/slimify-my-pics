var React = require('react');
var ReactDOM = require('react-dom');
var UrlInput = require('./UrlInput.js');

var Main = React.createClass({
	render: function() {
		return (
			<div>
				Hello World
				<UrlInput />
			</div>
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)