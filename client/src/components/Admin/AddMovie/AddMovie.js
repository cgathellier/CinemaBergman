import * as React from 'react';
import axios from 'axios';
import history from '../../../history';
import AdminForm from '../AdminForm';
import adminReducer from '../../../utils/adminReducer';
import { configFormData } from '../../../utils/axiosConfigs';

const initialState = {
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

const AddMovie = () => {
	const [state, dispatch] = React.useReducer(adminReducer, initialState);

	React.useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const onSubmit = e => {
		e.preventDefault();

		try {
			const newFilm = {
				...state,
				poster: '',
				snap: '',
			};

			(async function (film, poster, snap) {
				const formData = new FormData();
				formData.append('film', JSON.stringify(film));
				formData.append('poster', poster);
				formData.append('snap', snap);
				const res = await axios.post('/api/films', formData, configFormData);
				if (res.status === 201) {
					window.scroll(0, 0);
					history.push(`/admin/modifymovie/${res.data._id}`);
				}
			})(newFilm, state.poster, state.snap);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='admin__container'>
			<AdminForm
				onSubmit={onSubmit}
				dispatch={dispatch}
				state={state}
				submit={
					<input
						type='submit'
						className='addMovie__submit'
						value='Poursuivre et ajouter des séances'
					></input>
				}
			/>
		</div>
	);
};

export default AddMovie;
