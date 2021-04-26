import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
