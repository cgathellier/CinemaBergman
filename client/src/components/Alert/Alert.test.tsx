import React from 'react';
import { render } from '../../utils/test-utils';
import Alert from './Alert';
import { mockAlert } from '../../utils/tests-mocks';

describe('testing Alert component', () => {
	it('should render the mockAlert', () => {
		const { getByText } = render(<Alert />, { initialState: { alert: [mockAlert] } });

		getByText(/random alert message/i);
	});
});
