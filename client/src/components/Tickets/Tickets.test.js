import React from 'react';
import { shallow } from 'enzyme';
import Tickets from './Tickets';

describe('Tickets component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			bookingData: {
				selectedSeats: ['A5', 'B8'],
			},
		};

		wrapper = shallow(<Tickets {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
