import React from 'react';
import { render } from '../../utils/test-utils';
import LogoutModal from './LogoutModal';

describe('testing LogoutModal component', () => {
	it('should render the modal when displayModal prop is true', () => {
		const { getByText } = render(<LogoutModal />, {
			initialState: { modal: { displayModal: true } },
		});
		getByText(/se déconnecter/i);
	});

	it('should not render the modal when displayModal prop is false', () => {
		const { queryByText } = render(<LogoutModal />, {
			initialState: { modal: { displayModal: false } },
		});
		expect(queryByText(/se déconnecter/i)).not.toBeInTheDocument();
	});
});
