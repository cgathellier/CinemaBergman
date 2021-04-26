import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../utils/test-utils';
import Showtime from './Showtime';
import '@testing-library/jest-dom';

describe('testing Showtime component', () => {
	it('should render the correct content when deleteShowtime is truthy', () => {
		const mockDeleteFunction = jest.fn();
		const { getByTestId } = render(
			<Showtime
				deleteShowtime={mockDeleteFunction}
				children='random content'
				id='randomID'
			/>
		);

		getByTestId('deleteIcon');
		userEvent.click(getByTestId('deleteIcon'));
		expect(mockDeleteFunction).toHaveBeenCalledTimes(1);
		expect(mockDeleteFunction).toHaveBeenCalledWith('randomID');
	});

	it('should render the correct content when deleteShowtime is falsy', () => {
		const { queryByTestId } = render(
			<Showtime children='random content' id='randomID' />
		);

		expect(queryByTestId('deleteIcon')).not.toBeInTheDocument();
	});
});
