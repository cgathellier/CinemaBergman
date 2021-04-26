import * as React from 'react';
import FilmItem from './FilmItem/FilmItem';
import { connect } from 'react-redux';
import { IFilm, IReduxState } from '../../utils/Interfaces';

interface IFilmsList {
	presentation?: string;
	path: string;
	films: IFilm[];
}

const FilmsList = ({ presentation, path, films }: IFilmsList) => (
	<div className='filmList__container'>
		<div className='filmList__presentation'>{presentation}</div>
		<div className='filmList__list'>
			{films.length > 0
				? films.map((film, index) => {
						return (
							<FilmItem film={film} key={film.title + index} path={path} />
						);
				  })
				: ''}
		</div>
	</div>
);

const mapStateToProps = (state: IReduxState) => ({
	films: state.films,
});

export default connect(mapStateToProps)(FilmsList);
