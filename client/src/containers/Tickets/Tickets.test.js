import React from 'react';
import { shallow } from 'enzyme';
import { LayoutTickets } from './Tickets';

describe('LayoutTickets container', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			regOrAuth: 'register',
		};
		wrapper = shallow(<LayoutTickets {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
