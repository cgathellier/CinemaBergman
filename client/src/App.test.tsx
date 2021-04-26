import React from 'react';
import App from './App';
import { render } from './utils/test-utils';
import initHeaders from './utils/setAuthToken';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockFilm } from './utils/tests-mocks';

describe('Testing App component', () => {
	it('should render the correct default content', () => {
		const history = createMemoryHistory();
		localStorage.setItem('token', 'randomToken');
		const setAuthTokenSpy = jest.spyOn(initHeaders, 'setAuthToken');
		const { getByText } = render(
			<Router history={history}>
				<App />
			</Router>
		);
		getByText(/bergman/i);
		expect(setAuthTokenSpy).toHaveBeenCalledTimes(1);
	});

	it('should display components depending on url', () => {
		const history = createMemoryHistory();
		const { getByText, getAllByText, getByAltText } = render(
			<Router history={history}>
				<App />
			</Router>,
			{ initialState: { films: [mockFilm] } }
		);

		history.push('/films');
		getByAltText(/amadeus/i);

		// act(() => {
		// 	userEvent.click(getByAltText(/amadeus/i));
		// });
		// findByAltText('poster');

		history.push('/reservations');
		getAllByText(/vos réservations/i);
		history.push('/admin');
		getByText(/ajouter des séances/i);
		history.push('/booking');
		getByText(/réserver vos places/i);
		history.push('/register');
		getByText(/vous avez déjà un compte/i);
		history.push('/login');
		getByText(/vous n'avez pas encore de compte/i);
	});
});
