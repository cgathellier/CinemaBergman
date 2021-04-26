import { IAdminActionsPayload, IFilm } from './Interfaces';

export type TAdminActions =
	| {
			type: 'CHANGE_FIELD';
			payload: IAdminActionsPayload;
	  }
	| { type: 'ADD_POSTER' | 'ADD_SNAP'; payload: File }
	| {
			type: 'FETCH_DATA';
			payload: IFilm;
	  };

export type TDate = {
	[key: number]: string;
};
