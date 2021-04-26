import { render, screen } from '../../../utils/test-utils';
import React from 'react';
import ModifyMovie from './ModifyMovie';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockFilm, mockShowtime } from '../../../utils/tests-mocks';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('testing ModifyMovie component', () => {
	const server = setupServer(
		rest.get('/api/showtimes/randomID', (req, res, ctx) => {
			return res(ctx.status(201));
		})
	);

	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it('should render the correct default content', () => {
		server.use(
			rest.get('/api/films/randomID', (req, res, ctx) => {
				return res(ctx.json(mockFilm));
			})
		);

		server.use(
			rest.get('/api/showtimes/randomID', (req, res, ctx) => {
				return res(ctx.json(mockShowtime));
			})
		);

		const history = createMemoryHistory();
		const { getByText, getByAltText, findByText, getByPlaceholderText } = render(
			<Router history={history}>
				<ModifyMovie />;
			</Router>,
			{ initialState: { films: [mockFilm] } }
		);

		history.push('/admin/modifymovie');
		userEvent.click(getByAltText(/amadeus/i));
		getByText(/enregistrer/i);

		// expect(getByPlaceholderText(/titre/i)).toHaveValue('amadeus');
		// findByText(/2020/i);
		// screen.debug();
	});
});
