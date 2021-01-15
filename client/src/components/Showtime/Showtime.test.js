import React from 'react';
import { shallow } from 'enzyme';
import Showtime from './Showtime';

describe('Showtime component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			onClickCross: jest.fn(),
		};

		wrapper = shallow(<Showtime {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should a cross if onClickCross is passed as a prop', () => {
		expect(wrapper.exists('.showtime__crossContainer')).toBe(true);
	});

	it('should not render a cross if onClickCross is not passed as a prop', () => {
		mockProps = {};
		wrapper = shallow(<Showtime {...mockProps} />);
		expect(wrapper.exists('.showtime__crossContainer')).toBe(false);
	});

	it('should call onClickCross when cross is being clicked', () => {
		wrapper.find('.showtime__crossContainer').simulate('click');
		expect(mockProps.onClickCross).toHaveBeenCalledTimes(1);
	});
});
