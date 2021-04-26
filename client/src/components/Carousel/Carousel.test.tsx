import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '../../utils/test-utils';
import Carousel from './Carousel';
import { mockFilm, mockFilm2, mockFilm3, mockFilm4 } from '../../utils/tests-mocks';
import userEvent from '@testing-library/user-event';

describe('testing Carousel component', () => {
	it('should render the correct default content', async () => {
		const { getByAltText, getAllByTestId, findByText, queryByText } = render(
			<Carousel />,
			{
				initialState: { films: [mockFilm, mockFilm2, mockFilm3, mockFilm4] },
			}
		);
		expect(getAllByTestId('slideTitle')[0]).toHaveTextContent('lost in translation');
		expect(getAllByTestId('slideTitle')[1]).toHaveTextContent('amadeus');
		expect(getAllByTestId('slideTitle')[2]).toHaveTextContent('blade runner');

		getAllByTestId('arrow');
		userEvent.dblClick(getAllByTestId('arrow')[0]);
		// findAllByTestId('slideTitle')[1]
		// await findByText('fargo');
		// await waitForElementToBeRemoved(() => queryByText('blade runner'));

		screen.debug();
	});
});
