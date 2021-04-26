import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function render(
	ui,
	{
		initialState = {},
		store = createStore(rootReducer, initialState),
		route = '/',
		...renderOptions
	} = {}
) {
	window.history.pushState({}, 'Test page', route);
	const history = createMemoryHistory();
	function Wrapper({ children }) {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<Router history={history}>{children}</Router>
				</Provider>
			</BrowserRouter>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
