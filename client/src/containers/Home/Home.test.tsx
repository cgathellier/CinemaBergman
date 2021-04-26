import React from 'react';
import { render } from '../../utils/test-utils';
import { mockFilm } from '../../utils/tests-mocks';
import Home from './Home';

describe('testing Home container', () => {
	it('should render the Carousel and FilmsList components', () => {
		const { getByText, getAllByText } = render(<Home />, {
			initialState: { films: [mockFilm] },
		});
		getAllByText(/découvrir/i);
		getByText(/à l'affiche/i);
	});
});
