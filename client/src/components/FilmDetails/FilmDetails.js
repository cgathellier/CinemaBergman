import React, { Fragment } from 'react';
import classes from './FilmDetails.module.css';

const FilmDetails = props => {
    const snapPath = require('../../img/snaps/' + props.match.params.title + '.jpeg');
    const posterPath = require('../../img/posters/' + props.match.params.title + '.jpeg');
    return (
        <Fragment>
            <div className={classes.Container}>
                <img src={snapPath} alt={props.match.params.title} className={classes.Instant} />
                <div className={classes.grad}>
                    <div>
                        <p className={classes.Title}>Title</p>
                        <p className={classes.GenreDuration}>
                            Genre (Durée) <span className={classes.PublicBtn}>Public</span>
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
                                <img
                                    src={posterPath}
                                    alt={props.match.params.title}
                                    className={classes.Poster}
                                />
                            </div>
                            <div className={classes.Infos}>
                                <p>
                                    Sortie : <span>(date de sortie dans le cinéma)</span>
                                </p>
                                <p>
                                    Réalisé par <span>(Director)</span>
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
                        <div className={classes.Synopsis}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec tellus posuere,
                            ultrices purus vitae, sollicitudin odio. Nam at ante id felis condimentum
                            lobortis. Nulla consectetur lorem ut arcu tristique, eu luctus ipsum malesuada.
                        </div>
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
