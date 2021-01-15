import React from 'react';
import { shallow } from 'enzyme';
import Arrows from './Arrows';

describe('Arrows component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			direction: 'right',
			handleClick: jest.fn(),
		};
		wrapper = shallow(<Arrows {...mockProps} />);
	});

	it('should render Arrows component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render right arrow', () => {
		expect(wrapper.find('i').prop('className')).toBe('fas fa-angle-right');
	});

	it('should render left arrow', () => {
		mockProps = {
			direction: 'left',
		};

		const newWrapper = shallow(<Arrows {...mockProps} />);
		expect(newWrapper.find('i').prop('className')).toBe('fas fa-angle-left');
	});

	it('should call handleClick when an arrow is clicked', () => {
		wrapper.simulate('click');
		expect(mockProps.handleClick).toHaveBeenCalled();
	});
});
