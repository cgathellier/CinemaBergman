import React from 'react';
import FilmItem from './FilmItem/FilmItem';

const FilmsList = props => {
    let filmItems;
    if (props.filmsList) {
        let filmsList = props.filmsList;
        filmItems = filmsList.map((film, index) => {
            return <FilmItem filmInfos={film} key={film.title + index} {...props} />;
        });
    }

    return (
        <div className='filmList__container'>
            <div className='filmList__presentation'>{props.presentation}</div>
            <div className='filmList__list'>{filmItems}</div>
        </div>
    );
};

export default FilmsList;
