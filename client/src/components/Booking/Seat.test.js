import React from 'react';
import { shallow } from 'enzyme';
import Seat from './Seat';

describe('Seat component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			status: 'selected',
			seatID: 'A5',
			handleClick: jest.fn(),
		};
		wrapper = shallow(<Seat {...mockProps} />);
	});

	it('should render Seat component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should call handleClick when seat is clicked', () => {
		wrapper.simulate('click');
		expect(mockProps.handleClick).toHaveBeenCalled();
	});

	it('should pass seatStyle prop to classname', () => {
		expect(wrapper.prop('className')).toBe('selected seat');
	});
});
