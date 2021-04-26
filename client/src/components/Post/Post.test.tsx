import React from 'react';
import { render } from '../../utils/test-utils';
import Post from './Post';
import { mockPost } from '../../utils/tests-mocks';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('testing Post component', () => {
	it('should render default content, depending on the props', () => {
		const mockOnClick = jest.fn();
		const { getByText } = render(<Post post={mockPost} onClick={mockOnClick} />, {
			initialState: { auth: { name: 'username', isAdmin: false } },
		});

		getByText(/text/i);
		getByText(/supprimer/i);
		userEvent.click(getByText(/supprimer/i));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should not display delete button', () => {
		const mockOnClick = jest.fn();
		const { queryByText } = render(<Post post={mockPost} onClick={mockOnClick} />, {
			initialState: { auth: { name: 'randomUsername', isAdmin: false } },
		});
		expect(queryByText(/supprimer/i)).not.toBeInTheDocument();
	});
});
