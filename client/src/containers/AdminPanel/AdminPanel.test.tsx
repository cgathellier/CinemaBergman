import React from 'react';
import { render } from '../../utils/test-utils';
import { mockFilm } from '../../utils/tests-mocks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AdminPanel } from './AdminPanel';
import userEvent from '@testing-library/user-event';

describe('Testing AdminPanel container', () => {
	it('should render the correct default content', () => {
		const { getByText } = render(<AdminPanel isAdmin={true} />);
		getByText(/ajouter un film/i);
	});

	it('should render either AddMovie or ModifyMovie depending on url', () => {
		const history = createMemoryHistory();
		const { getByText, getByAltText } = render(
			<Router history={history}>
				<AdminPanel isAdmin={true} />
			</Router>,
			{ initialState: { films: [mockFilm] } }
		);

		history.push('/admin/addmovie');
		getByText(/poursuivre et ajouter des séances/i);
		history.push('/admin/modifymovie');
		userEvent.click(getByAltText(/amadeus/i));
		getByText(/enregistrer les modifications/i);
	});
});
