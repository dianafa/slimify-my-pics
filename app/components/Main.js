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

	onClick: function() {
		this.refs.UrlInput1.onClick();
		this.refs.UrlInput2.onClick();
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

		$.ajax({
			type: "POST",
			url: url,
			data: data
		});
	},

	render: function() {
		return (
			<div className="main-content">
				<h2 className="welcome">Welcome!</h2>
				<div className="inputs-area">
					<UrlInput showHistory={this.showHistory} addToHistory={this.addToHistory} ref="UrlInput1"/>
					<UrlInput showHistory={this.showHistory} addToHistory={this.addToHistory} ref="UrlInput2"/>
				</div>
				<button type="button" className="go" onClick={this.onClick}>
					Start
				</button>
				<div className="history-area">
					<History ref="historyComponent" />
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('app')
)