import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';

describe('Login component', () => {
	let wrapper;
	let mockProps;
	const loginFunc = jest.fn();

	beforeEach(() => {
		mockProps = {
			login: loginFunc,
		};
		wrapper = shallow(<Login {...mockProps} />);
	});

	it('should render Login component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onChange for email and update the state', () => {
		wrapper.find('[type="email"]').prop('onChange')({
			target: { name: 'email', value: 'user@gmail.com' },
		});
		expect(wrapper.find('[type="email"]').prop('value')).toBe('user@gmail.com');
	});

	it('should call onChange for password and update the state', () => {
		wrapper.find('[type="password"]').prop('onChange')({
			target: { name: 'password', value: 'randomPassword' },
		});
		expect(wrapper.find('[type="password"]').prop('value')).toBe('randomPassword');
	});

	// it('should call onSubmit and call the mockProps.login', () => {
	// 	wrapper.find('[type="submit"]').simulate('click');
	// 	expect(loginFunc).toHaveBeenCalled();
	// });
});
