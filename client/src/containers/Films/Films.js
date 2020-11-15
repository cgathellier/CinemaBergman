import React, { useEffect } from 'react';
import FilmsList from '../../components/FilmsList/FilmsList';

const LayoutFilms = props => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div>
            <FilmsList filmsList={props.filmsList} path='/films/' />
        </div>
    );
};

export default LayoutFilms;
