import React from 'react';
import { shallow } from 'enzyme';
import FilmItem from './FilmItem';

describe('FilmItem component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			filmInfos: {
				title: 'title',
				genre: 'Comédie',
			},
			path: '/mainPage',
		};
		wrapper = shallow(<FilmItem {...mockProps} />);
	});

	it('should render FilmItem component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
