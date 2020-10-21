import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import classes from './LayoutFilms.module.css';
import FilmsList from '../../../components/FilmsList/FilmsList';

const LayoutFilms = props => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const filmsList = props.filmsList;
    const nouveautes = filmsList.filter((film, index) => index < 4 )
                            

    return (
        <Fragment>
            <div className={classes.Container}>
                <Route
                    path='/films'
                    exact
                    render={() => <FilmsList filmsList={props.filmsList} path='/films/' />}
                />
                <Route
                    path='/nouveautes'
                    exact
                    render={() => <FilmsList filmsList={nouveautes} path='/films/' />}
                />
            </div>
        </Fragment>
    );
};

export default LayoutFilms;
