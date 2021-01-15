import React from 'react';
import { shallow } from 'enzyme';
import LayoutHome from './Home';

describe('Booking container', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			filmsList: [{}, {}, {}, {}, {}],
			onClickPoster: jest.fn(),
		};
		wrapper = shallow(<LayoutHome {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
