var React = require('react');
var ReactDOM = require('react-dom');
var UrlInput = require('./UrlInput.js');
var History = require('./History.js');

require('../styles/main.scss');

var Main = React.createClass({
	getInitialState: function() {
		return {
			url: null
		};
	},

	showHistory: function (url) {
		console.log("Main - showHistory for page: ", url)
		var history = this.refs.historyComponent;
		history.showHistory(url);
	},

	render: function() {
		return (
			<div className="main-content">
				<h2>Welcome!</h2>
				<UrlInput showHistory={this.showHistory} />
				<History ref="historyComponent" />
			</div>
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)