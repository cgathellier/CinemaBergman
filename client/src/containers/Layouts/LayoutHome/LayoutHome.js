import React, { Fragment, useEffect, useState } from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import FilmsList from '../../../components/FilmsList/FilmsList';
import classes from './LayoutHome.module.css';
import axios from 'axios';

const LayoutHome = props => {
    const [filmList, setFilmList] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        const getData = async () => {
            const data = await axios.get('/api/films');
            setFilmList(data);
        };
        getData();
    }, []);

    const handlePosterClick = filmSpecs => {
        props.onPosterClick(filmSpecs);
    };

    return (
        <Fragment>
            <div className={classes.Container}>
                <Carousel filmsSpecs={props.filmsSpecs} />
                <FilmsList filmsSpecs={props.filmsSpecs} onPosterClick={() => handlePosterClick()} />
            </div>
        </Fragment>
    );
};

export default LayoutHome;
