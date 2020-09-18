import React from 'react';
import classes from './FilmItem.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const filmItem = ({ filmInfos, onClickPoster }) => {
    const handleClickPoster = () => {
        onClickPoster(filmInfos);
    };

    return (
        <div className={classes.FilmItem}>
            <div className={classes.imgContainer}>
                <Link to={'/films/' + filmInfos._id}>
                    <img
                        src={filmInfos.poster}
                        alt={filmInfos.title}
                        className={classes.Poster}
                        onClick={handleClickPoster}
                    />
                </Link>
                <div className={classes.genre} title={filmInfos.genre}>
                    {filmInfos.genre}
                </div>
            </div>
            <div className={classes.title} title={filmInfos.title}>
                {filmInfos.title}
            </div>
        </div>
    );
};

export default filmItem;
