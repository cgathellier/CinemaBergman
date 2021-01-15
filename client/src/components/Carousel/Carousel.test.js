import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './Carousel';
import Arrows from './Arrows/Arrows';

describe('Carousel component', () => {
	let wrapper;
	let mockProps;
	let mockPreviousSlide = jest.fn();
	let mockNextSlide = jest.fn();

	beforeEach(() => {
		mockProps = {
			films: [{}, {}, {}, {}],
		};
		wrapper = shallow(<Carousel {...mockProps} />);
	});

	it('should render Carousel component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('function calls from arrows being clicked', () => {
		it('should call previousSlide when left arrow is being clicked', () => {
			// wrapper.find(Arrows).first().simulate('click');
			// expect(mockPreviousSlide).toHaveBeenCalled();
		});
	});

	// it('should render selected dot', () => {
	// 	expect(wrapper.prop('className')).toBe('dot--selected');
	// });

	// it('should render unselected dot', () => {
	// 	mockProps = {
	// 		selected: 'false',
	// 	};

	// 	const newWrapper = shallow(<Dot {...mockProps} />);
	// 	expect(newWrapper.prop('className')).toBe('dot');
	// });
});
