import React from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import FilmsList from '../../../components/FilmsList/FilmsList';
import classes from './LayoutHome.module.css';

const LayoutHome = props => {
    const handlePosterClick = filmInfos => {
        props.onClickPoster(filmInfos);
    };

    const nouveautes = props.filmsList.filter((_, index) => index < 4);

    return (
        <div className={classes.Container}>
            <Carousel films={nouveautes} />
            <FilmsList
                filmsList={props.filmsList}
                onClickPoster={handlePosterClick}
                path='/films/'
                presentation="À l'affiche"
            />
        </div>
    );
};

export default LayoutHome;
