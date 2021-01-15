import React from 'react';
import { shallow } from 'enzyme';
import ModifyMovie from './ModifyMovie';

describe('ModifyMovie component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<ModifyMovie />);
	});

	it('should render ModifyMovie component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
