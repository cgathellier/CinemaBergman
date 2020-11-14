import React, { Fragment, useEffect } from 'react';
import classes from './Films.module.css';
import FilmsList from '../../components/FilmsList/FilmsList';

const LayoutFilms = props => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <Fragment>
            <div className={classes.Container}>
                <FilmsList filmsList={props.filmsList} path='/films/' />
            </div>
        </Fragment>
    );
};

export default LayoutFilms;
