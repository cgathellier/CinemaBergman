import React from 'react';
import { shallow } from 'enzyme';
import LayoutFilms from './Films';

describe('Booking container', () => {
	it('should match the snapshot', () => {
		expect(shallow(<LayoutFilms />)).toMatchSnapshot();
	});
});
