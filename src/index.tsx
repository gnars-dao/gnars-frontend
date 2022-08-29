import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Web3 from 'web3';
import { App } from './App';
import './assets/css/global.css';
import { BASENAME } from './constants/env';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

const getLibrary = (p?: any) => {
	if (p) {
		return new Web3(p);
	}
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={BASENAME}>
				<Web3ReactProvider getLibrary={getLibrary}>
					<App />
				</Web3ReactProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
