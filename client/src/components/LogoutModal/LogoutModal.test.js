import React from 'react';
import { shallow } from 'enzyme';
import { LogoutModal } from './LogoutModal';

describe('LogoutModal component', () => {
	let wrapper;
	let mockProps;
	beforeEach(() => {
		mockProps = {
			displayModal: true,
			logout: jest.fn(),
			hideModal: jest.fn(),
		};
		wrapper = shallow(<LogoutModal {...mockProps} />);
	});

	it('should match with snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render nothing if displayModal is false', () => {
		const mockProps2 = {
			displayModal: false,
		};
		expect(shallow(<LogoutModal {...mockProps2} />)).toEqual({});
	});

	describe('test functions calls', () => {
		it('should call hideModal', () => {
			wrapper.find('.logoutModal__backdrop').simulate('click');
			expect(mockProps.hideModal).toHaveBeenCalledTimes(1);
		});

		it('should call logout', () => {
			wrapper.find('.logoutModal__iconCtn').simulate('click');
			expect(mockProps.logout).toHaveBeenCalledTimes(1);
		});
	});
});
