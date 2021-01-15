import { STORE_FILMLIST } from '../actions/types';

const initialState = [];

export default function films(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case STORE_FILMLIST:
			const newArray = state.concat(payload);
			return newArray;
		default:
			return state;
	}
}
