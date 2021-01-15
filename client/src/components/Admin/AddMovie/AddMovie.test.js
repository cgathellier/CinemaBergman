import React from 'react';
import { shallow } from 'enzyme';
import AddMovie from './AddMovie';

describe('AddMovie component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<AddMovie />);
	});

	it('should render AddMovie component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
