import React from 'react';
import { shallow } from 'enzyme';
import AuthModal from './AuthModal';

describe('AuthModal component', () => {
	let wrapper;
	let mockProps;
	beforeEach(() => {
		mockProps = {
			text: 'random text',
		};
		wrapper = shallow(<AuthModal {...mockProps} />);
	});

	it('should render AuthModal component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should display props.text', () => {
		expect(wrapper.find('.authModal__container').at(0).text()).toContain(mockProps.text);
	});
});
