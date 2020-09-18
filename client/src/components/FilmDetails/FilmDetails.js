import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import classes from './FilmDetails.module.css';

const FilmDetails = props => {
    const [filmData, setFilmData] = useState([]);

    useEffect(() => {
        const filmUrl = window.location.href;
        const id = filmUrl.split('/films/')[1];
        const getData = async () => {
            const res = await axios.get(`/api/films/${id}`);
            setFilmData(res.data);
            console.log(res.data);
        };
        getData();
    }, []);

    return (
        <Fragment>
            <div className={classes.Container}>
                <img src={filmData.snap} alt={filmData.title} className={classes.Instant} />
                <div className={classes.grad}>
                    <div>
                        <p className={classes.Title}>{filmData.title}</p>
                        <p className={classes.GenreDuration}>
                            {filmData.genre} ({filmData.duration})
                            <span className={classes.PublicBtn}>{filmData.classification}</span>
                        </p>
                        <div className={classes.SeancesBtn}>
                            <i className='far fa-clock'></i> Séances
                        </div>
                    </div>
                    <div className={classes.Toolbar}>
                        <span className={classes.Note}>
                            <i className='fas fa-heart'></i>Noter
                        </span>
                        <span className={classes.AddList}>
                            <div className={classes.PlusSign}>+</div>Ajouter à la liste
                        </span>
                    </div>
                    <div>
                        <div className={classes.Presentation}>
                            <div className={classes.imgContainer}>
                                <img src={filmData.poster} alt={filmData.title} className={classes.Poster} />
                            </div>
                            <div className={classes.Infos}>
                                <p>
                                    Sortie : <span>{filmData.release}</span>
                                </p>
                                <p>
                                    Réalisé par <span>{filmData.director}</span>
                                </p>
                                <p>Avec (Acteurs)</p>
                            </div>
                        </div>
                        <div className={classes.Stars}>
                            <i className='far fa-star'></i>
                            <i className='far fa-star'></i>
                            <i className='far fa-star'></i>
                            <i className='far fa-star'></i>
                            <i className='far fa-star'></i>
                        </div>
                        <div className={classes.Synopsis}>{filmData.synopsis}</div>
                    </div>
                </div>
            </div>
            <div>
                <div>Séances</div>
            </div>
        </Fragment>
    );
};

export default FilmDetails;
