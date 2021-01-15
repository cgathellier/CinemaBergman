import React from 'react';
import { mount, shallow } from 'enzyme';
import { LayoutBooking } from './Booking';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import history from '../../history';
import Row from '../../components/Booking/Row';

describe('Booking container', () => {
	let wrapper;
	let mockProps;
	const server = setupServer(
		rest.get('/api/bookings/5fd10527595b4c00171e4ce3', (req, res, ctx) => {
			return res(
				ctx.json({
					data: {
						selectedSeats: ['B5', 'B6'],
					},
				})
			);
		})
	);

	beforeEach(() => {
		mockProps = {
			name: 'username',
		};
		wrapper = shallow(<LayoutBooking {...mockProps} />);
	});
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('content displayed depending on name prop', () => {
		it('should render the booking UI', () => {
			expect(wrapper.exists('.Booking__container')).toBe(true);
		});

		it('should not render the booking UI', () => {
			mockProps = {
				name: '',
			};
			wrapper = shallow(<LayoutBooking {...mockProps} />);
			expect(wrapper.exists('.Booking__container')).toBe(false);
		});
	});

	// test('should load bookedSeats', async () => {
	// 	mount(
	// 		<Router history={history}>
	// 			<LayoutBooking />
	// 		</Router>
	// 	);

	// 	expect(wrapper.find(Row).at(1).prop('booked')).toEqual([]);
	// });
});
