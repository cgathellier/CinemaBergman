import axios from 'axios';
import * as React from 'react';
import { Route } from 'react-router-dom';
import history from '../../../history';
import adminReducer from '../../../utils/adminReducer';
import { configFormData, configJson, configToken } from '../../../utils/axiosConfigs';
import { IFilmForm } from '../../../utils/Interfaces';
import FilmsList from '../../FilmsList/FilmsList';
import Showtime from '../../Showtime/Showtime';
import AdminForm from '../AdminForm';

const initialState: IFilmForm = {
	_id: '',
	title: '',
	director: '',
	actors: '',
	duration: '',
	genre: 'Comédie',
	classification: 'Tous publics',
	release: '',
	poster: '',
	snap: '',
	synopsis: '',
};

const ModifyMovie = (): JSX.Element => {
	const dayRef = React.useRef<HTMLInputElement>(null);
	const hourRef = React.useRef<HTMLInputElement>(null);
	const [showtimes, setShowtimes] = React.useState([]);
	const [state, dispatch] = React.useReducer(adminReducer, initialState);

	const url = window.location.href;
	const key = '/modifymovie/';

	const getShowtimes = React.useCallback(async () => {
		if (url.includes(key)) {
			const filmID = url.split(key)[1];
			const res = await axios.get(`/api/showtimes/${filmID}`);
			setShowtimes(res.data);
		}
	}, [url]);

	React.useEffect(() => {
		getShowtimes();
	}, [getShowtimes]);

	React.useEffect(() => {
		// window.scroll(0, 0);
		(async function () {
			if (url.includes(key)) {
				const filmID = url.split(key)[1];
				const res = await axios.get(`/api/films/${filmID}`);
				dispatch({ type: 'FETCH_DATA', payload: res.data });
			}
		})();
	}, [url]);

	const deleteShowtime = async (id: String) => {
		await Promise.all([
			axios.delete(`/api/bookings/${id}`, configToken),
			axios.delete(`/api/showtimes/${id}`, configToken),
		]);
		getShowtimes();
	};

	const addShowtime = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!dayRef || !dayRef.current || !hourRef || !hourRef.current) {
			return null;
		}

		if (!dayRef.current.value || !hourRef.current.value) {
			return alert('Les champs pour ajouter une séance ne sont pas tous remplis');
		}

		if (url.includes(key)) {
			const filmID = url.split(key)[1];

			const newShowtime = {
				day: dayRef.current.value,
				hour: hourRef.current.value,
				film: filmID,
			};

			const res = await axios.post(
				`/api/showtimes/${filmID}`,
				newShowtime,
				configJson
			);

			if (res.status === 201) {
				dayRef.current.value = '';
				hourRef.current.value = '';
				dayRef.current.focus();
				getShowtimes();
			}
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			let config = { ...configFormData };

			const newFilm = {
				...state,
				poster: '',
				snap: '',
			};

			let formData;
			if (typeof state.poster === 'string' && typeof state.snap === 'string') {
				newFilm.poster = state.poster;
				newFilm.snap = state.snap;
				formData = { ...newFilm };
				config = { ...configJson };
			} else if (
				typeof state.poster === 'string' &&
				typeof state.snap === 'object'
			) {
				newFilm.poster = state.poster;
				formData = new FormData();
				formData.append('film', JSON.stringify(newFilm));
				formData.append('snap', state.snap);
			} else if (
				typeof state.poster === 'object' &&
				typeof state.snap === 'string'
			) {
				newFilm.snap = state.snap;
				formData = new FormData();
				formData.append('film', JSON.stringify(newFilm));
				formData.append('poster', state.poster);
			} else {
				formData = new FormData();
				formData.append('film', JSON.stringify(newFilm));
				formData.append('poster', state.poster);
				formData.append('snap', state.snap);
			}

			const res = await axios.put(`/api/films/${newFilm._id}`, formData, config);
			if (res.status === 200) {
				// window.scroll(0, 0);
				document.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteFilm = async () => {
		await Promise.all([
			axios.delete(`/api/showtimes/${state._id}`, configToken),
			axios.delete(`/api/films/${state._id}`, configToken),
		]);
		history.replace('/admin/modifymovie');
		document.location.reload();
	};

	return (
		<div className='admin__container'>
			<Route
				path='/admin/modifymovie'
				exact
				render={() => <FilmsList path='/admin/modifymovie/' />}
			/>
			<Route path='/admin/modifymovie/:id'>
				<div>
					<form className='admin__field' onSubmit={e => addShowtime(e)}>
						<p className='modifyMovie__addShowtimes'>Ajouter une séance *</p>
						<div className='modifyMovie__showtimesInputs'>
							<div>
								<label htmlFor='date'>Date *</label>
								<input
									type='date'
									id='date'
									name='showtimes'
									ref={dayRef}
								></input>
							</div>
							<div>
								<label htmlFor='hour'>Heure *</label>
								<input
									type='time'
									id='hour'
									name='showtimes'
									ref={hourRef}
								></input>
							</div>
						</div>
						<button type='submit' className='modifyMovie__submitSchedule'>
							Ajouter la séance
						</button>
						<div className='modifyMovie__stList'>
							{showtimes.map((st, index) => {
								const { day, hour, _id } = st;
								return (
									<Showtime
										key={index}
										id={_id}
										deleteShowtime={(e: String) => deleteShowtime(e)}
									>
										<div>{day}</div>
										<div>{hour}</div>
									</Showtime>
								);
							})}
						</div>
					</form>
					<AdminForm
						onSubmit={onSubmit}
						dispatch={dispatch}
						state={state}
						submitBtn={
							<button type='submit' className='modifyMovie__submit'>
								Enregistrer les modifications
							</button>
						}
					/>
					<div className='modifyMovie__deleteCtn'>
						<div className='modifyMovie__delete' onClick={deleteFilm}>
							Supprimer
						</div>
					</div>
				</div>
			</Route>
		</div>
	);
};

export default ModifyMovie;
