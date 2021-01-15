import { STORE_FILMLIST } from './types';

const storeFilmList = films => dispatch => {
	dispatch({ type: STORE_FILMLIST, payload: films });
};

export default storeFilmList;
