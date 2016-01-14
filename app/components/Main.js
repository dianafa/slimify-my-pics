var React = require('react');
var ReactDOM = require('react-dom');
var UrlInput = require('./UrlInput.js');

//require('styles/main');

require('../styles/main.scss');

var Main = React.createClass({
	render: function() {
		return (
			<UrlInput />
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)