import * as React from 'react';
import FilmItem from './FilmItem/FilmItem';
import { connect } from 'react-redux';

const FilmsList = ({ presentation, path, films }) => (
	<div className='filmList__container'>
		<div className='filmList__presentation'>{presentation}</div>
		<div className='filmList__list'>
			{films
				? films.map((film, index) => {
						return (
							<FilmItem
								filmInfos={film}
								key={film.title + index}
								path={path}
							/>
						);
				  })
				: ''}
		</div>
	</div>
);

const mapStateToProps = state => ({
	films: state.films,
});

export default connect(mapStateToProps)(FilmsList);
