import * as React from 'react';
import { Link } from 'react-router-dom';

const color = {
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

const filmItem = ({ filmInfos, path }) => (
	<div className='filmItem'>
		<div className='imgContainer'>
			<Link to={path + filmInfos._id}>
				<img
					src={filmInfos.poster}
					alt={filmInfos.title}
					className='filmItem__poster'
				/>
			</Link>
			<div
				className='filmItem__genre'
				title={filmInfos.genre}
				style={{ backgroundColor: `${color[filmInfos.genre]}` }}
			>
				{filmInfos.genre}
			</div>
		</div>
		<div className='filmItem__title' title={filmInfos.title}>
			{filmInfos.title}
		</div>
	</div>
);

export default filmItem;
