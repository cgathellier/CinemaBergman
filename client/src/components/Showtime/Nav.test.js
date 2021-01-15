import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('Nav component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			selected: 'true',
			handleClick: jest.fn(),
		};

		wrapper = shallow(<Nav {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('affect the correct className depending on the value of props.selected', () => {
		it('should be nav__selectedContainer', () => {
			expect(wrapper.find('div').at(0).prop('className')).toBe('nav__selectedContainer');
		});

		it('should be nav__container', () => {
			mockProps = {
				selected: 'false',
			};
			wrapper = shallow(<Nav {...mockProps} />);
			expect(wrapper.find('div').at(0).prop('className')).toBe('nav__container');
		});
	});

	it('should call handleClick function when Nav component is being clicked', () => {
		wrapper.find('div').at(0).simulate('click');
		expect(mockProps.handleClick).toHaveBeenCalledTimes(1);
	});
});
