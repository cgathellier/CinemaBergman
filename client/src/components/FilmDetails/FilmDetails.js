import axios from 'axios';
import { locale } from 'moment';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NameContext } from '../../containers/Main';
import Post from '../Post/Post';
import classes from './FilmDetails.module.css';

const FilmDetails = () => {
    const [filmData, setFilmData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState({
        title: '',
        text: '',
    });

    const filmUrl = window.location.href;
    const filmId = filmUrl.split('/films/')[1];
    const getData = async () => {
        const getFilms = await axios.get(`/api/films/${filmId}`);
        await setFilmData(getFilms.data);
        const getPosts = await axios.get(`/api/posts/${filmId}`);
        setPosts(getPosts.data);
    };

    const name = useContext(NameContext);

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

    const handleChange = e => {
        setPostContent({ ...postContent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            const newPost = {
                title: postContent.title,
                text: postContent.text,
            };

            const res = await axios.post(`/api/posts/${filmId}`, newPost, config);
            if (res.status === 201) {
                document.location.reload();
                window.scroll(0, 0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    let postsElt = posts
        .sort((a, b) => a.date - b.date)
        .map((post, index) => {
            return <Post key={index} post={post} onClick={handleClick} />;
        });

    const postForm = name ? (
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <input
                type='text'
                className={classes.postTitle}
                placeholder='Titre du commentaire'
                name='title'
                onChange={e => handleChange(e)}
                value={postContent.title}
                maxLength={40}
            />
            <textarea
                type='textarea'
                className={classes.textarea}
                placeholder='Commentaire'
                name='text'
                onChange={e => handleChange(e)}
                value={postContent.text}
            ></textarea>
            <input type='submit' className={classes.submit} value='Ajouter un commentaire' />
        </form>
    ) : (
        <div>
            Veuillez vous connecter pour poster un commentaire
            <NavLink to='/login'>Connexion</NavLink>
        </div>
    );

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
            <div className={classes.formContainer}>{postForm}</div>
        </Fragment>
    );
};

export default FilmDetails;
