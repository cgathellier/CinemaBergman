import React from 'react';
import { shallow } from 'enzyme';
import { Post } from './Post';

describe('Post component', () => {
	let wrapper;
	let mockProps;

	beforeEach(() => {
		mockProps = {
			name: 'username',
			isAdmin: false,
			post: {
				name: 'username',
			},
			onClick: jest.fn(),
		};

		wrapper = shallow(<Post {...mockProps} />);
	});

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('test the deleteBtn rendering', () => {
		it('should render the delete button if the user connected is the author of the post', () => {
			expect(wrapper.exists('.post__delete')).toBe(true);
		});

		it('should render the deleteBtn since the user connected is admin', () => {
			const newMockProps = {
				name: 'notUsername',
				isAdmin: true,
				post: {
					name: 'username',
				},
				onClick: jest.fn(),
			};
			const newWrapper = shallow(<Post {...newMockProps} />);

			expect(newWrapper.exists('.post__delete')).toBe(true);
		});

		it('should not render the deleteBtn since the user connected is not admin nor the author of the post', () => {
			const newMockProps = {
				name: 'notUsername',
				isAdmin: false,
				post: {
					name: 'username',
				},
				onClick: jest.fn(),
			};
			const newWrapper = shallow(<Post {...newMockProps} />);

			expect(newWrapper.exists('.post__delete')).toBe(false);
		});
	});

	it('should call onClick function when deleteBtn is clicked', () => {
		wrapper.find('.post__delete').simulate('click');
		expect(mockProps.onClick).toHaveBeenCalledTimes(1);
	});
});
