import React from 'react';
import { shallow } from 'enzyme';
import { Toolbar } from './Toolbar';

describe('Toolbar component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			name: 'username',
			isAdmin: true,
			logout: jest.fn(),
			showModal: jest.fn(),
		};

		wrapper = shallow(<Toolbar {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('render of adminNav', () => {
		it('should render adminNav', () => {
			expect(wrapper.exists('.fa-user-lock')).toBe(true);
		});

		it('should not render adminNav', () => {
			mockProps = {
				...mockProps,
				isAdmin: false,
			};
			wrapper = shallow(<Toolbar {...mockProps} />);
			expect(wrapper.exists('.fa-user-lock')).toBe(false);
		});
	});

	describe('render of usernameDisplay', () => {
		it('should render a div with className of toolbar__username', () => {
			expect(wrapper.exists('.toolbar__username')).toBe(true);
		});

		it('should not render usernameDisplay', () => {
			mockProps = {
				...mockProps,
				name: '',
			};
			wrapper = shallow(<Toolbar {...mockProps} />);
			expect(wrapper.exists('.toolbar__username')).toBe(false);
		});
	});

	describe('functions calls', () => {
		it('should call logout when logoutBtn is being clicked', () => {
			wrapper.find('.toolbar__logoutBtn').simulate('click');
			expect(mockProps.logout).toHaveBeenCalledTimes(1);
		});

		it('should call showModal when userIcon is being clicked', () => {
			wrapper.find('.toolbar__user').simulate('click');
			expect(mockProps.showModal).toHaveBeenCalledTimes(1);
		});
	});
});
