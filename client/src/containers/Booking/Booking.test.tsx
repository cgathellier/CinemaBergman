import React from 'react';
import { render } from '../../utils/test-utils';
import Booking from './Booking';

describe('testing Booking container', () => {
	it('should render AuthModal component when the user is not logged in', () => {
		const { getByText } = render(<Booking />);
		getByText(/veuillez vous connecter pour réserver/i);
	});

	it('should render rows and seats when the user is logged in', () => {
		const { getByText } = render(<Booking />, {
			initialState: { auth: { name: 'username' } },
		});
		getByText(/places libres/i);
	});
});
