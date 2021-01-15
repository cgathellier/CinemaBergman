import React from 'react';
import { shallow } from 'enzyme';
import Slider from './Slider';

describe('Slider component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Slider />);
	});

	it('should render Slider component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
