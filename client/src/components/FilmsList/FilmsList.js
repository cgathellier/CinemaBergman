import React from 'react';
import FilmItem from './FilmItem/FilmItem';
import classes from './FilmsList.module.css';

const FilmsList = props => {
    const handleClickPoster = filmSpecs => {
        props.onPosterClick(filmSpecs);
    };

    let filmItems;
    if (props.filmsSpecs) {
        let filmSpecs = props.filmsSpecs;
        filmItems = filmSpecs.map((film, index) => {
            return (
                <FilmItem
                    genre={film.genre}
                    title={film.title}
                    fullSpecs={film}
                    key={film.title + index}
                    onClickPoster={() => handleClickPoster()}
                />
            );
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
