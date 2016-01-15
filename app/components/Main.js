var React = require('react');
var ReactDOM = require('react-dom');
var UrlInput = require('./UrlInput.js');

require('../styles/main.scss');

var Main = React.createClass({
	render: function() {
		return (
			<div className="main-content">
				<h2>Welcome!</h2>
				<UrlInput />
			</div>
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)