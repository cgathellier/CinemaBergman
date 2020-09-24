import React from 'react';
import FilmItem from './FilmItem/FilmItem';
import classes from './FilmsList.module.css';

const FilmsList = props => {
    let filmItems;
    if (props.filmsList) {
        let filmsList = props.filmsList;
        filmItems = filmsList.map((film, index) => {
            return <FilmItem filmInfos={film} key={film.title + index} {...props} />;
        });
    }

    return (
        <div className={classes.container}>
            <div className={classes.presentation}>Actuellement au cinéma</div>
            <div className={classes.FilmsList}>{filmItems}</div>
        </div>
    );
};

export default FilmsList;
