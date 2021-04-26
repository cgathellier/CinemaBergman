import React from 'react';
import { render } from '../../utils/test-utils';
import RegAuth from './RegAuth';

describe('testing RegAuth container', () => {
	it('should render the Register component', () => {
		const { getAllByPlaceholderText } = render(<RegAuth regOrAuth='register' />);
		getAllByPlaceholderText(/confirmation du mot de passe/i);
	});

	it('should render the Login component', () => {
		const { getByText } = render(<RegAuth regOrAuth='login' />);
		getByText(/vous n'avez pas encore de compte/i);
	});
});
