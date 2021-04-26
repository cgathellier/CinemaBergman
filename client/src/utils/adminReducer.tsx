import { IFilmForm } from './Interfaces';
import { TAdminActions } from './Types';

export interface IState {
	_id?: string;
	title: string;
	director: string;
	actors: string;
	duration: string;
	genre: string;
	classification: string;
	release: string;
	poster: File;
	snap: File;
	synopsis: string;
}

const adminReducer = (state: IFilmForm, action: TAdminActions): IFilmForm => {
	switch (action.type) {
		case 'CHANGE_FIELD': {
			const mockState = { ...state };
			const newState = Object.assign(mockState, action.payload);
			return newState;
		}
		case 'ADD_POSTER': {
			return { ...state, poster: action.payload };
		}
		case 'ADD_SNAP': {
			return { ...state, snap: action.payload };
		}
		case 'FETCH_DATA': {
			const mockState = { ...state };
			const newState = Object.assign(mockState, action.payload);
			return newState;
		}
		default:
			return state;
	}
};

export default adminReducer;
