import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../utils/test-utils';
import Row from './Row';

describe('testing Row component', () => {
	it('should call handleclick mocked function', () => {
		const mockHandleClick = jest.fn();
		const { getAllByTestId } = render(
			<Row
				selected={['A1']}
				booked={['A2']}
				cols={2}
				name='A'
				handleClick={mockHandleClick}
			/>
		);

		expect(getAllByTestId(/seat/i).length).toEqual(2);
		userEvent.click(getAllByTestId(/seat/i)[0]);
		expect(mockHandleClick).toHaveBeenCalledTimes(1);
	});
});
