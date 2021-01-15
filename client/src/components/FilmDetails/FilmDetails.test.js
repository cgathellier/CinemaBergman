import React from 'react';
import { shallow } from 'enzyme';
import { FilmDetails } from './FilmDetails';

describe('FilmDetails component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			name: 'Michel',
		};
		wrapper = shallow(<FilmDetails {...mockProps} />);
	});

	it('should render FilmDetails component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
