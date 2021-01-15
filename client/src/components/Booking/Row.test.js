import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';
import Seat from './Seat';

describe('Row component', () => {
	let wrapper;
	let mockProps;
	let mockHandleClick;

	beforeEach(() => {
		mockProps = {
			selected: 'A3',
			booked: 'A5',
			name: 'A',
			cols: 10,
			handleClick: jest.fn(),
		};
		mockHandleClick = mockProps.handleClick;
		wrapper = shallow(<Row {...mockProps} />);
	});

	it('should render Row component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render en equal number of Seats as the cols prop', () => {
		expect(wrapper.find(Seat).length).toEqual(mockProps.cols);
	});

	it('should give selected as a value to status prop for the 3rd seat', () => {
		expect(wrapper.find(Seat).at(2).prop('status')).toBe('selected');
	});

	it('should give booked as a value to status prop for the 5th seat', () => {
		expect(wrapper.find(Seat).at(4).prop('status')).toBe('booked');
	});

	it('should give en empty value to status prop for the other seats', () => {
		expect(wrapper.find(Seat).at(0).prop('status')).toBe('');
	});
});
