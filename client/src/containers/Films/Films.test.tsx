import React from 'react';
import { render } from '../../utils/test-utils';
import { mockFilm } from '../../utils/tests-mocks';
import Films from './Films';

describe('testing Films container', () => {
	it('should render FilmList', () => {
		const { getByAltText } = render(<Films />, {
			initialState: { films: [mockFilm] },
		});

		getByAltText(/amadeus/i);
	});
});
