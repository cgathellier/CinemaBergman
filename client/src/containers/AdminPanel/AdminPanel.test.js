import React from 'react';
import { shallow } from 'enzyme';
import { AdminPanel } from './AdminPanel';

describe('AdminPanel container', () => {
	it('should match the snapshot', () => {
		expect(shallow(<AdminPanel />)).toMatchSnapshot();
	});
});
