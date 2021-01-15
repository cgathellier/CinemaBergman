import * as React from 'react';

const AdminForm = ({ onSubmit, dispatch, state, submit }) => {
	return (
		<form className='admin__form' onSubmit={e => onSubmit(e)}>
			<div className='admin__field'>
				<input
					type='text'
					placeholder='Titre *'
					value={state.title}
					name='title'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { title: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<input
					type='text'
					placeholder='Réalisateur *'
					value={state.director}
					name='director'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { director: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<input
					type='text'
					placeholder='Acteurs et actrices, séparés par une virgule *'
					value={state.actors}
					name='actors'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { actors: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<input
					type='text'
					placeholder='Durée *'
					value={state.duration}
					name='duration'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { duration: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field admin__list'>
				<label htmlFor='Genre'>Genre *</label>
				<select
					type='text'
					value={state.genre}
					name='genre'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { genre: e.target.value },
						})
					}
					id='Genre'
				>
					<option value='Comédie'>Comédie</option>
					<option value='Drame'>Drame</option>
					<option value='Historique'>Historique</option>
					<option value='Thriller'>Thriller</option>
					<option value='Horreur'>Horreur</option>
					<option value='Romance'>Romance</option>
					<option value='Science-Fiction'>Science-Fiction</option>
					<option value='Guerre'>Guerre</option>
					<option value='Action'>Action</option>
					<option value='Documentaire'>Documentaire</option>
					<option value='Aventure'>Aventure</option>
					<option value='Policier'>Policier</option>
				</select>
			</div>
			<div className='admin__field admin__list'>
				<label htmlFor='Classification'>Classification *</label>
				<select
					id='Classification'
					type='text'
					value={state.classification}
					name='classification'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { classification: e.target.value },
						})
					}
				>
					<option value='Tous publics'>Tous publics</option>
					<option value='-12'>-12</option>
					<option value='-16'>-16</option>
					<option value='-18'>-18</option>
				</select>
			</div>
			<div className='admin__field'>
				<label htmlFor='release'>Date de sortie *</label>
				<input
					type='date'
					id='release'
					value={state.release.split('T')[0]}
					name='release'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { release: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<input
					type='text'
					placeholder='Synopsis *'
					value={state.synopsis}
					name='synopsis'
					required
					onChange={e =>
						dispatch({
							type: 'CHANGE_FIELD',
							payload: { synopsis: e.target.value },
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<label htmlFor='poster'>Affiche du film *</label>
				<input
					type='file'
					accept='.jpeg,.jpg,.png'
					id='poster'
					name='image'
					onChange={e =>
						dispatch({
							type: 'ADD_POSTER',
							payload: e.target.files[0],
						})
					}
				></input>
			</div>
			<div className='admin__field'>
				<label htmlFor='snap'>Image extraite du film *</label>
				<input
					type='file'
					accept='.jpeg,.jpg,.png'
					id='snap'
					name='image'
					onChange={e =>
						dispatch({
							type: 'ADD_SNAP',
							payload: e.target.files[0],
						})
					}
				></input>
			</div>
			{submit}
		</form>
	);
};

export default AdminForm;
