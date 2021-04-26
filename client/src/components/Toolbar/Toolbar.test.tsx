import React from 'react';
import { render } from '../../utils/test-utils';
import Toolbar from './Toolbar';

describe('testing Toolbar component', () => {
	it('should render the correct content when admin user is logged in', () => {
		const { getByText } = render(<Toolbar />, {
			initialState: { auth: { name: 'adminUser', isAdmin: true } },
		});

		getByText(/déconnecter/i);
		getByText('a');
		getByText('Admin');
	});
});
