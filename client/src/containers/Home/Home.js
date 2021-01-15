import * as React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import FilmsList from '../../components/FilmsList/FilmsList';

const Home = () => (
	<div className='Home__Container'>
		<Carousel />
		<FilmsList path='/films/' presentation="À l'affiche" />
	</div>
);

export default Home;
