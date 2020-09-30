import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NameContext } from '../../containers/Main';
import Post from '../Post/Post';
import classes from './FilmDetails.module.css';

const FilmDetails = () => {
    const [filmData, setFilmData] = useState([]);
    const [posts, setPosts] = useState([]);

    const filmUrl = window.location.href;
    const filmId = filmUrl.split('/films/')[1];
    const getData = async () => {
        const getFilms = await axios.get(`/api/films/${filmId}`);
        await setFilmData(getFilms.data);
        const getPosts = await axios.get(`/api/posts/${filmId}`);
        setPosts(getPosts.data);
    };

    const name = useContext(NameContext);
    const postForm = name ? (
        <form>
            <label htmlFor='newPost'>Ajouter un commentaire</label>
            <input type='textarea' />
        </form>
    ) : (
        <div>
            Veuillez vous connecter pour poster un commentaire
            <NavLink to='/login'>Connexion</NavLink>
        </div>
    );

    useEffect(() => {
        getData();
    }, []);

    const handleClick = async postId => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'x-auth-token': token,
            },
        };
        await axios.delete(`/api/posts/${postId}`, config);
        getData();
    };

    let postsElt = posts
        .sort((a, b) => a.date - b.date)
        .map((post, index) => {
            return <Post key={index} post={post} onClick={handleClick} />;
        });

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
            <div className={classes.postsContainer}>{postsElt}</div>
            <div>{postForm}</div>
        </Fragment>
    );
};

export default FilmDetails;
