import './styles/main.css';
import React from 'react';
//import ProductData from './ProductData';
//import CartAPI from './utils/CartAPI';
import SlimifyMyPicsApp from './components/App';

main();

function main() {
	// Load Mock Product Data into localStorage
	//ProductData.init();

	// Load Mock API Call
	//CartAPI.getProductData();

	var app = document.createElement('div');
	document.body.appendChild(app);

	React.render(<SlimifyMyPicsApp />, app);
}