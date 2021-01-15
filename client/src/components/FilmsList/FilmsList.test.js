import React from 'react';
import { shallow } from 'enzyme';
import FilmsList from './FilmsList';
import FilmItem from './FilmItem/FilmItem';

describe('FilmsList component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			filmsList: [
				{
					_id: 1,
				},
				{
					_id: 2,
				},
			],
		};
		wrapper = shallow(<FilmsList {...mockProps} />);
	});

	it('should render FilmsList component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should render the same number of FilmItem than the props.filmsList length', () => {
		expect(wrapper.find(FilmItem).length).toEqual(mockProps.filmsList.length);
	});
});
