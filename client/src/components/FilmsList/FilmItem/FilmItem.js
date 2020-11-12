import React from 'react';
import classes from './FilmItem.module.css';
import { Link } from 'react-router-dom';

const genre = {
    0: 'Comédie',
    1: 'Drame',
    2: 'Historique',
    3: 'Thriller',
    4: 'Horreur',
    5: 'Romance',
    6: 'Science-Fiction',
    7: 'Guerre',
    8: 'Action',
    9: 'Documentaire',
    10: 'Aventure',
    11: 'Policier',
};

const color = {
    0: '#32a1f2',
    1: '#4A0A0D',
    2: '#3f1c1c',
    3: '#262930',
    4: '#9b1717',
    5: '#d6599e',
    6: '#5c52ce',
    7: '#000000',
    8: '#e25e06',
    9: '#006315',
    10: '#36c4c9',
    11: '#FBD25A',
};

const filmItem = ({ filmInfos, path }) => {
    const getGenreKey = value => {
        return Object.keys(genre).find(key => genre[key] === value);
    };
    const style = { backgroundColor: `${color[getGenreKey(filmInfos.genre)]}` };
    return (
        <div className={classes.FilmItem}>
            <div className={classes.imgContainer}>
                <Link to={path + filmInfos._id}>
                    <img src={filmInfos.poster} alt={filmInfos.title} className={classes.Poster} />
                </Link>
                <div className={classes.genre} title={filmInfos.genre} style={style}>
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
