var React = require('react');
var ReactDOM = require('react-dom');
var UrlInput = require('./UrlInput.js');
var History = require('./History.js');
var $ = require ('jquery');

require('../styles/main.scss');

var Main = React.createClass({
	getInitialState: function() {
		return {
			url: null
		};
	},

	showHistory: function (url) {
		var history = this.refs.historyComponent;
		history.showHistory(url);
	},

	addToHistory: function (result) {
		console.log(result);
		var data = {
			testId: Math.floor((Math.random() * 10000) + 1),
			urlId: 5,
			url: result.data.url,
			breakdownImg: result.data.runs[1].firstView.breakdown.image.bytes || 0,
			totalPageSize: result.data.runs[1].firstView.bytesIn || 0
		},
		url = 'http://localhost:3000/test';

		console.log('wysylam', data)

		$.ajax({
			type: "POST",
			url: url,
			data: data
		});
	},

	render: function() {
		return (
			<div className="main-content">
				<h2>Welcome!</h2>
				<UrlInput showHistory={this.showHistory} addToHistory={this.addToHistory} />
				<History ref="historyComponent" />
			</div>
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)