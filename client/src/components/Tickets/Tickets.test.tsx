import React from 'react';
import { render } from '../../utils/test-utils';
import { mockFilm, mockBookings, mockShowtime } from '../../utils/tests-mocks';
import Tickets from './Tickets';

describe('testing Tickets component', () => {
	it('should render the correct content depending on props', () => {
		const { getByText } = render(
			<Tickets film={mockFilm} showtime={mockShowtime} bookings={mockBookings} />
		);
		getByText(/B6/i);
	});
});
