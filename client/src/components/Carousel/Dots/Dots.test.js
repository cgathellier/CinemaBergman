import React from 'react';
import { shallow } from 'enzyme';
import Dot from './Dot';

describe('Dot component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			selected: 'true',
		};
		wrapper = shallow(<Dot {...mockProps} />);
	});

	it('should render Dot component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected dot', () => {
		expect(wrapper.prop('className')).toBe('dot--selected');
	});

	it('should render unselected dot', () => {
		mockProps = {
			selected: 'false',
		};

		const newWrapper = shallow(<Dot {...mockProps} />);
		expect(newWrapper.prop('className')).toBe('dot');
	});
});
