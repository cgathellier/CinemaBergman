import * as React from 'react';
import { Link } from 'react-router-dom';
import { IFilm } from '../../../utils/Interfaces';

type TColor = {
	[key: string]: string;
};

const color: TColor = {
	Comédie: '#32a1f2',
	Drame: '#4A0A0D',
	Historique: '#3f1c1c',
	Thriller: '#262930',
	Horreur: '#9b1717',
	Romance: '#d6599e',
	'Science-Fiction': '#5c52ce',
	Guerre: '#000000',
	Action: '#e25e06',
	Documentaire: '#006315',
	Aventure: '#36c4c9',
	Policier: '#FBD25A',
};

interface IFilmItem {
	film: IFilm;
	path: string;
}

const filmItem = ({ film, path }: IFilmItem) => (
	<div className='filmItem'>
		<div className='imgContainer'>
			<Link to={path + film._id}>
				<img src={film.poster} alt={film.title} className='filmItem__poster' />
			</Link>
			<div
				className='filmItem__genre'
				title={film.genre}
				style={{ backgroundColor: `${color[film.genre]}` }}
			>
				{film.genre}
			</div>
		</div>
		<div className='filmItem__title' title={film.title}>
			{film.title}
		</div>
	</div>
);

export default filmItem;
