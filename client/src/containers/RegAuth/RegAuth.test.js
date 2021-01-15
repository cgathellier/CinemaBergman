import React from 'react';
import { shallow } from 'enzyme';
import LayoutRegAuth from './RegAuth';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

describe('RegAuth container', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			regOrAuth: 'register',
		};
		wrapper = shallow(<LayoutRegAuth {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Register component', () => {
		expect(wrapper.exists(Register)).toBe(true);
	});

	it('should render Login component', () => {
		mockProps = {
			regOrAuth: 'login',
		};
		wrapper = shallow(<LayoutRegAuth {...mockProps} />);
		expect(wrapper.exists(Login)).toBe(true);
	});
});
