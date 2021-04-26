import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../utils/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Login } from './Login';

describe('testing Login component', () => {
	it('should call login function when submit button is clicked', () => {
		const mockLogin = jest.fn();

		const history = createMemoryHistory();

		const { getByRole, getByPlaceholderText } = render(
			<Router history={history}>
				<Login login={mockLogin} />
			</Router>
		);

		userEvent.type(getByRole('textbox'), 'randomEmail');
		userEvent.type(getByPlaceholderText(/mot de passe/i), 'randomPassword');
		userEvent.click(getByRole('button'));

		expect(mockLogin).toHaveBeenCalledTimes(1);
	});
});
