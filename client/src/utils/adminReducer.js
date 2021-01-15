const adminReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'CHANGE_FIELD': {
			const mockState = { ...state };
			const newState = Object.assign(mockState, payload);
			return newState;
		}
		case 'ADD_POSTER': {
			return { ...state, poster: payload };
		}
		case 'ADD_SNAP': {
			return { ...state, snap: payload };
		}
		case 'FETCH_DATA': {
			const mockState = { ...state };
			const newState = Object.assign(mockState, payload);
			return newState;
		}
		default:
			return state;
	}
};

export default adminReducer;
