import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import classes from './LayoutFilms.module.css';
import FilmsList from '../../../components/FilmsList/FilmsList';

const LayoutFilms = props => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <Fragment>
            <div className={classes.Container}>
                <Route
                    path='/films'
                    exact
                    render={() => <FilmsList filmsList={props.filmsList} path='/films/' />}
                />
            </div>
        </Fragment>
    );
};

export default LayoutFilms;
