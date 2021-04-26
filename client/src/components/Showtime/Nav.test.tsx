import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../utils/test-utils';
import Nav from './Nav';

describe('testing Nav component', () => {
	it('should render the correct default content', () => {
		const mockHandleClick = jest.fn();
		const { getByText, getByTestId } = render(
			<Nav
				selected={true}
				day='JEU.'
				date='28'
				month='JAN.'
				index={0}
				handleClick={mockHandleClick}
			/>
		);
		getByText(/28/i);
		userEvent.click(getByTestId('navClick'));
		expect(mockHandleClick).toHaveBeenCalledTimes(1);
	});
});
