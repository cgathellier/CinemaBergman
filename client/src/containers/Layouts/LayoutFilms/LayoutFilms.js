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

    const handleClickPoster = filmInfos => {
        setPosterClicked(filmInfos);
    };

    return (
        <Fragment>
            <div className={classes.Container}>
                <Route
                    path='/films'
                    exact
                    render={() => <FilmsList filmsList={props.filmsList} onClickPoster={handleClickPoster} />}
                />
                <Route
                    path='/films/:title'
                    render={props => <FilmDetails filmInfos={posterClicked} {...props} />}
                />
            </div>
        </Fragment>
    );
};

export default LayoutFilms;
