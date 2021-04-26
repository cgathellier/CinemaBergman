import React from 'react';
import { render } from '../../utils/test-utils';
import Tickets from './Tickets';

describe('testing Tickets container', () => {
	it('should render AuthModal when the user is not logged in', () => {
		const { getByText } = render(<Tickets />);
		getByText(/se connecter/i);
	});

	it('should not render AuthModal when the user is logged in', () => {
		const { queryByText } = render(<Tickets />, {
			initialState: { auth: { name: 'username' } },
		});
		expect(queryByText(/se connecter/i)).not.toBeInTheDocument();
	});
});
