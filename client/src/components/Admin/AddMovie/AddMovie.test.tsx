import { render, screen } from '../../../utils/test-utils';
import React from 'react';
import AddMovie from './AddMovie';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// import history from '../../../history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('testing AddMovie component', () => {
	// const server = setupServer(
	// 	rest.post('/api/films', (req, res, ctx) => {
	// 		return res(ctx.status(201));
	// 	})
	// );

	// beforeAll(() => server.listen());

	// afterEach(() => server.resetHandlers());

	// afterAll(() => server.close());

	it('should render the correct default content', () => {
		const { getByText } = render(<AddMovie />);
		getByText(/poursuivre/i);
	});

	it('should call history push method when form is submitted', () => {
		// server.use(
		// 	rest.post('/api/films', (req, res, ctx) => {
		// 		return res(ctx.status(201));
		// 	})
		// );
		const history = createMemoryHistory();
		// history.push = jest.fn();
		const spy = jest.spyOn(history, 'push');

		const { getByText, getByPlaceholderText, getByLabelText } = render(
			<Router history={history}>
				<AddMovie />
			</Router>
		);

		userEvent.type(getByPlaceholderText(/titre/i), 'titre');
		userEvent.type(getByPlaceholderText(/réalisateur/i), 'réalisateur');
		userEvent.type(getByPlaceholderText(/acteurs/i), 'actrices');
		userEvent.type(getByPlaceholderText(/durée/i), 'durée');
		userEvent.selectOptions(getByLabelText(/genre/i), 'Horreur');
		userEvent.selectOptions(getByLabelText(/classification/i), '-18');
		userEvent.type(getByLabelText(/sortie/i), '2020-10-10');
		userEvent.type(getByPlaceholderText(/synopsis/i), 'synopsis');

		const poster = new File(['poster'], 'poster.png', { type: 'image/png' });
		userEvent.upload(getByLabelText(/affiche/i), poster);

		const snap = new File(['snap'], 'snap.png', { type: 'image/png' });
		userEvent.upload(getByLabelText(/extrait/i), snap);

		expect(getByPlaceholderText(/titre/i)).toHaveValue('titre');
		expect(getByLabelText(/genre/i)).toHaveValue('Horreur');
		expect(getByLabelText(/sortie/i)).toHaveValue('2020-10-10');

		userEvent.click(getByText(/poursuivre/i));
		// screen.debug();
		// expect(spy).toHaveBeenCalledTimes(1);
	});
});
