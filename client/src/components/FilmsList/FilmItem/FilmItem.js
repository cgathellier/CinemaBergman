import React from 'react';
import classes from './FilmItem.module.css';
import { Link } from 'react-router-dom';

const filmItem = props => {
    const imgPath = require('../../../img/posters/' + props.title + '.jpeg');

    const handleClickSeances = () => {
        props.onClickSeances(props.fullSpecs);
    };

    const handleClickPoster = () => {
        props.onClickPoster(props.fullSpecs);
    };

    return (
        <div className={classes.FilmItem}>
            <div className={classes.imgContainer}>
                <Link to={'/films/' + props.title}>
                    <img
                        src={imgPath}
                        alt={props.title}
                        className={classes.Poster}
                        onClick={handleClickPoster}
                    />
                </Link>
                <div className={classes.genre} title={props.genre}>
                    {props.genre}
                </div>
                <div className={classes.seances} onClick={handleClickSeances}>
                    <i className='far fa-clock'></i>Séances
                </div>
            </div>
            <div className={classes.title} title={props.title}>
                {props.title}
            </div>
        </div>
    );
};

export default filmItem;
