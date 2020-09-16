import React, { Fragment, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import classes from './LayoutFilms.module.css';
import FilmsList from '../../../components/FilmsList/FilmsList';
import FilmDetails from '../../../components/FilmDetails/FilmDetails';

const LayoutFilms = props => {
    const [posterClicked, setPosterClicked] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        if (props.posterClicked) setPosterClicked(props.posterClicked);
    }, [props.posterClicked]);

    const handlePosterClick = filmSpecs => {
        setPosterClicked(filmSpecs);
    };

    return (
        <Fragment>
            <div className={classes.Container}>
                <Route
                    path='/films'
                    exact
                    render={() => (
                        <FilmsList filmsSpecs={props.filmsSpecs} onPosterClick={() => handlePosterClick()} />
                    )}
                />
                <Route
                    path='/films/:title'
                    render={props => <FilmDetails filmSpecs={posterClicked} {...props} />}
                />
            </div>
        </Fragment>
    );
};

export default LayoutFilms;
