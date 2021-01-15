import React from 'react';
import { shallow } from 'enzyme';
import Slide from './Slide';

describe('Slide component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			onTouchStart: jest.fn(),
			onTouchEnd: jest.fn(),
			onMouseDown: jest.fn(),
			onMouseUp: jest.fn(),
			onMouseLeave: jest.fn(),
			filmData: {},
		};
		wrapper = shallow(<Slide {...mockProps} />);
	});

	it('should render Slide component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('event calls tests', () => {
		it('should call onTouchStart when touched', () => {
			wrapper.simulate('touchstart');
			expect(mockProps.onTouchStart).toHaveBeenCalled();
		});

		it('should call onTouchEnd when touched', () => {
			wrapper.simulate('touchend');
			expect(mockProps.onTouchEnd).toHaveBeenCalled();
		});

		it('should call onMouseDown when touched', () => {
			wrapper.simulate('mousedown');
			expect(mockProps.onMouseDown).toHaveBeenCalled();
		});

		it('should call onMouseUp when touched', () => {
			wrapper.simulate('mouseup');
			expect(mockProps.onMouseUp).toHaveBeenCalled();
		});

		it('should call onMouseLeave when touched', () => {
			wrapper.simulate('mouseleave');
			expect(mockProps.onMouseLeave).toHaveBeenCalled();
		});
	});

	it('should display the slide content if props.filmData is not undefined', () => {
		expect(wrapper.text()).not.toBeNull();
	});

	it('should not display the slide content if props.filmData is undefined', () => {
		mockProps = {
			filmData: undefined,
		};

		const newWrapper = shallow(<Slide {...mockProps} />);
		expect(newWrapper.text()).toBe('');
	});
});
