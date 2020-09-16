import React, { Fragment } from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import FilmsList from '../../../components/FilmsList/FilmsList';
import classes from './LayoutHome.module.css';

const LayoutHome = props => {
    const handlePosterClick = filmInfos => {
        props.onClickPoster(filmInfos);
    };

    return (
        <Fragment>
            <div className={classes.Container}>
                <Carousel filmsList={props.filmsList} />
                <FilmsList filmsList={props.filmsList} onClickPoster={handlePosterClick} />
            </div>
        </Fragment>
    );
};

export default LayoutHome;
